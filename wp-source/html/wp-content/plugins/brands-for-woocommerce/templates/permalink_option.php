<?php
$options = get_option( 'berocket_brands_permalink' );
?>
<table class="form-table">
    <tbody>
        <tr>
            <th><label for="berocket_brands_permalink"><?php echo esc_html($norm_name); ?></label></th>
            <td>
                <input name="berocket_brands_permalink" id="berocket_brands_permalink" type="text" value="<?php echo esc_html($options); ?>" class="regular-text code" placeholder="<?php _e( 'brands', 'brands-for-woocommerce' ) ?>">
                <code>/brand/</code>
            </td>
        </tr>
    </tbody>
</table>
