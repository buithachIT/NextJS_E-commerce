<?php
/*
Plugin Name: Custom CORS for localhost:3000
Description: Handle CORS headers for requests from localhost:3000 with credentials support.
Version: 1.0
Author: Your Name
*/

add_action('init', function () {
    // Lấy origin từ request
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    // Danh sách origin được phép
    $allowed_origins = [
        'http://localhost:3000',
        // Bạn có thể thêm origin khác nếu cần
    ];

    if (in_array($origin, $allowed_origins)) {
        // Set header CORS chính xác với origin
	header_remove("Access-Control-Allow-Origin"); // Xoá header cũ bị ghi đè
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-JWT-Auth, X-JWT-Refresh, woocommerce-session');
        header('Access-Control-Expose-Headers: X-JWT-Auth, X-JWT-Refresh, woocommerce-session');
        header('Access-Control-Max-Age: 600');
    }

    // Nếu là preflight OPTIONS request thì trả về 200 và dừng xử lý
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit(0);
    }
});

