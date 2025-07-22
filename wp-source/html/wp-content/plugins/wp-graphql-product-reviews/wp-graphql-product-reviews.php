<?php

/**
 * Plugin Name: WPGraphQL Product Reviews
 * Description: Thêm GraphQL support cho review (comment + rating) và mutation tạo review kèm rating.
 * Version: 1.0
 * Author: BuiThach
 */

if (! defined('ABSPATH')) {
  exit;
}

// Đăng ký comment meta 'rating' để WPGraphQL expose
add_action('init', function () {
  if (function_exists('register_comment_meta')) {
    register_comment_meta('comment', 'rating', [
      'type' => 'integer',
      'description' => 'Rating (1 to 5 stars)',
      'single' => true,
      'show_in_graphql' => true,
      'graphql_single_name' => 'rating',
    ]);
  }
});

// Thêm trường rating vào output Comment GraphQL type
add_action('graphql_register_types', function () {
  register_graphql_field('Comment', 'rating', [
    'type' => 'Int',
    'description' => __('Rating (1 to 5 stars)', 'wp-graphql-product-reviews'),
    'resolve' => function ($comment) {
      // Lấy comment ID đúng cách
      $comment_id = null;

      if (is_object($comment) && isset($comment->comment_ID)) {
        $comment_id = $comment->comment_ID;
      } elseif (is_array($comment) && isset($comment['comment_ID'])) {
        $comment_id = $comment['comment_ID'];
      } elseif (is_object($comment) && isset($comment->id)) {
        // $comment->id là Base64, decode ra dạng 'comment:11'
        $decoded = base64_decode($comment->id);
        if (preg_match('/comment:(\d+)/', $decoded, $matches)) {
          $comment_id = intval($matches[1]);
        }
      }

      if (!$comment_id) {
        error_log('WPGraphQL Product Reviews: Không lấy được comment ID từ object: ' . print_r($comment, true));
        return null;
      }

      // Log tất cả meta để debug
      $all_meta = get_comment_meta($comment_id);
      error_log("Comment ID $comment_id meta keys and values: " . print_r($all_meta, true));

      // Lấy rating meta
      $rating = get_comment_meta($comment_id, 'rating', true);
      error_log("Rating meta for comment $comment_id: " . var_export($rating, true));

      return $rating !== '' ? intval($rating) : null;
    },
  ]);
});

// Tạo mutation tạo review + rating
add_action('graphql_register_types', function () {
  register_graphql_mutation('createProductReview', [
    'inputFields' => [
      'productId' => [
        'type' => 'ID',
        'description' => 'ID sản phẩm cần review',
      ],
      'authorName' => [
        'type' => 'String',
        'description' => 'Tên người đánh giá',
      ],
      'content' => [
        'type' => 'String',
        'description' => 'Nội dung review',
      ],
      'rating' => [
        'type' => 'Int',
        'description' => 'Điểm đánh giá 1-5',
      ],
    ],
    'outputFields' => [
      'comment' => [
        'type' => 'Comment',
        'resolve' => function ($payload) {
          return $payload['comment'];
        }
      ],
    ],
    'mutateAndGetPayload' => function ($input, $context, $info) {
      // Kiểm tra productId có hợp lệ không
      $product_id = isset($input['productId']) ? intval($input['productId']) : 0;
      if (!$product_id || get_post_type($product_id) !== 'product') {
        throw new \GraphQL\Error\UserError('Product ID không hợp lệ');
      }

      // Chuẩn bị dữ liệu comment
      $commentdata = [
        'comment_post_ID' => $product_id,
        'comment_author' => sanitize_text_field($input['authorName'] ?? 'Khách'),
        'comment_content' => sanitize_textarea_field($input['content'] ?? ''),
        'comment_approved' => 1, // tự approve luôn (bạn có thể đổi chính sách)
      ];

      // Tạo comment
      $comment_id = wp_insert_comment($commentdata);
      if (!$comment_id) {
        throw new \GraphQL\Error\UserError('Không tạo được review');
      }

      // Lưu rating meta
      if (!empty($input['rating'])) {
        update_comment_meta($comment_id, 'rating', intval($input['rating']));
      }

      return [
        'comment' => get_comment($comment_id),
      ];
    },
  ]);
});