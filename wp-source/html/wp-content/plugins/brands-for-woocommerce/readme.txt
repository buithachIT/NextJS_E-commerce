=== Brands for WooCommerce ===
Plugin Name: Brands for WooCommerce
Contributors: berocket, dholovnia
Donate link: https://berocket.com/?utm_source=wordpress_org&utm_medium=donate&utm_campaign=product_brand
Tags: brands, woocommerce brands, brands slider, manufacturer, brand category
Requires at least: 5.0
Tested up to: 6.7
Stable tag: 3.8.6
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Brands for WooCommerce plugin allows you to add brands for products in your shop.

== Description ==

Brands for WooCommerce plugin allows you to add brands for products in your shop. Each brand has a name, description, thumbnail, banner, rating, products category, tooltip, and checkbox 'Featured'.

= Features: =
&#9989; Custom images for brands: thumbnail and banner
&#9989; Custom pages for brands
&#9989; Shortcode to display brands list (as a list or a slider)
&#9989; Shortcode to display brands grouped by alphabet or category
&#9989; Shortcode to display product list for given brands (by ids or slugs)
&#9989; Shortcode to display information about brand (by ID)
&#9989; Shortcode to display brand image for product page
&#9989; Shortcode to display single brand info for single product
&#9989; Display brand description and image on brand pages


= Features in Version 3.8: =
&#9989; Option to remove brands with products out of stock from the List and the Catalog 


= Features in Version 3.7: =
&#9989; Support Gutenberg on the Widget admin page 
&#9989; Brands hierarchy included to Brands List and Catalog
&#9989; WooCommerce Product Brands Description widget: thumbnail and banner; related products ordered by title, date, random; slider mode for related products;  
&#9989; Brand tab for single product page
&#9989; Brand pages now have permalinks like category and tag pages
&#9989; Shortcode [brands_info] now supports following types of information: name, banner, thumbnail, description, external link, related products or 'all' for all brand options
&#9989; Admin option to show selected brands in widgets now is dropdown with autocomplete function
&#9989; Brands to Scroll: now maximum brands to scroll for the widget is number of brands per page for this widget

= Features in Version 3.6: =
&#9989; New brand properties: banner (large brand image, shown on the brand page), URL, rating (to sort brands in the specified order), attribute 'Featured', tooltip (text to be shown on mouse over), categories
&#9989; New slider features: change slide speed, change slide mode (fade/slide), easing, dots under the slider with possibility to select color
&#9989; Additional customization for images: width and height in px/%, fit (cover, contain, fill, none), align to text (left, right, under text, above text)
&#9989; Show number of products for each brand in widgets and shortcodes
&#9989; Sort brands by alphabet, number of products, randomly and also place featured brands first in widgets and shortcodes
&#9989; Use cache to speed up page loading.

= Plugin Links: =
[Demo](https://woocommerce-brands.berocket.com/shop/?utm_source=wordpress_org&utm_medium=plugin_links&utm_campaign=product_brand)
[Docs](https://docs.berocket.com/plugin/woocommerce-brands?utm_source=wordpress_org&utm_medium=plugin_links&utm_campaign=product_brand)


= Plugin video =
[youtube https://youtu.be/lATsHNMWpgM]

= Compatibility with WooCommerce plugins =
Brands for WooCommerce has been tested for compatibility, and is fully compatible with the following WooCommerce plugins that you can add to your site:

&#128312; [**Advanced AJAX Product Filters**](https://wordpress.org/plugins/woocommerce-ajax-filters/)
&#128312; [**Force Sell for WooCommerce**](https://wordpress.org/plugins/force-sell-for-woocommerce/)
&#128312; [**Min and Max Quantity for WooCommerce**](https://wordpress.org/plugins/minmax-quantity-for-woocommerce/)
&#128312; [**Product of the Day for WooCommerce**](https://wordpress.org/plugins/product-of-the-day-for-woocommerce/)
&#128312; [**Products Compare for WooCommerce**](https://wordpress.org/plugins/products-compare-for-woocommerce/)
&#128312; [**Product Tabs Manager for WooCommerce**](https://wordpress.org/plugins/product-tabs-manager-for-woocommerce/)

== Installation ==
Important: First of all, you have to download and activate the WooCommerce plugin, because without it Brands for WooCommerce cannot work without it.

1. Unzip the downloaded .zip file.
2. Upload the Brands for WooCommerce folder into the `wp-content/plugins/` directory of your WordPress site.
3. Activate `Brands for WooCommerce` from Plugins page.

= Configuration =
Brands for WooCommerce will add a new sub-menu item called "Brands" in the "WooCommerce" menu. There you will be able to access the plugin settings page.


== Frequently Asked Questions ==

= Is it compatible with all WordPress themes? =
Compatibility with all themes is impossible, because they are simply too many themes. Generally, if themes are developed according to the WordPress and WooCommerce guidelines, BeRocket plugins are sure to be compatible with them.

= How can I get support if my WooCommerce plugin is not working? =
If you have problems with our plugins or something is not working as it should, follow these preliminary steps first:

* Test the plugin with a WordPress default theme, to be sure that the error is not caused by the theme you are currently using.
* Deactivate all plugins you are using and check if the problem is still occurring.
* Ensure that your plugin version, your theme version and your WordPress and WooCommerce version (if required) are updated and that the problem you are experiencing has not already been solved in a later plugin update.

If none of the previous listed actions helps you to solve the problem, then, submit a ticket in the forum and describe your problem accurately, specify WordPress and WooCommerce versions you are using and any other information that might help us solve your problem as fast as possible. Thanks!

---

== Screenshots ==
1. General settings
2. Adding brands

---

== Changelog ==

= 3.8.6 =
* Enhancement - Compatibility version: WooCommerce 9.5
* Fix - Change CDN links for elements

= 3.8.5 =
* Enhancement - Compatibility version: Wordpress 6.7 and WooCommerce 9.4
* Fix - Translation init errors with WordPress 6.7

= 3.8.4 =
* Enhancement - Compatibility version: WooCommerce 9.3
* Enhancement - WooCommerce requirements
* Fix - Plugin update to premium PHP error

= 3.8.3 =
* Enhancement - Compatibility version: Wordpress 6.6 and WooCommerce 9.1
* Fix - New plugin framework

= 3.8.2.4 =
* Enhancement - Compatibility version: Wordpress 6.4 and WooCommerce 8.4
* Fix - Brands order for admin area
* Fix - Some issue with settings update
* Fix - New plugin framework

= 3.8.2.3 =
* Fix - CRITICAL Security fix
* Enhancement - add shortcode [brb_prod_binfo]
* Fix - deprecated Divi module
* Fix - new Divi module


= 3.8.2.2 =
* Fix - Move deprecated functionality
* Fix - Sanitize most options in widgets and shortcodes
* Fix - Display brands in title
* Fix - Save brands related products

= 3.8.2.1 =
* Fix - Fatal error for not replaced files with FTP update
* Fix - Deprecated add-on issues

= 3.8.2 =
* Enhancement - Compatibility version: Wordpress 6.2 and WooCommerce 7.6
* Enhancement - New Divi Module with more functionality
* Enhancement - New Shortcodes with functionality from widgets
* Enhancement - Better compatibility with some themes
* Fix - PHP Fatal error on some hosting
* Fix - Slider scroll
* Fix - Some options in widgets do not work

= 3.8.1 =
* Fix - Widgets: Some options do not save
* Fix - Widgets: Notice when some options not selected
* Fix - Widgets: "Show only selected brands" work incorrect
* Fix - Widgets: Search brands list
* Fix - Widgets: Select multiple products

= 3.8 =
* Enhancement - Compatibility version: Wordpress 6.1 and WooCommerce 7.1
* Fix - Some plugin links to match new BeRocket Site

= 3.7.0.2 =
* Enhancement - compatibility version: Wordpress 5.9 and WooCommerce 6.1
* Fix - Issue with page builders
* Fix - Shortcode not displayed with some settings
* Fix - Slider do not work with some themes

= 3.7 =
* Enhancement - Support Gutenberg on the Widget admin page 
* Enhancement - Brands hierarchy included to Brands List and Catalog
* Enhancement - WooCommerce Product Brands Description widget: thumbnail and banner; related products ordered by title, date, random; slider mode for related products;  
* Enhancement - Brand tab for single product page
* Enhancement - Shortcode [brands_info] now supports following types of information: name, banner, thumbnail, description, external link, related products or 'all' for all brand options
* Enhancement - Admin option to show selected brands in widgets now is dropdown with autocomplete function
* Fix - Brand pages now have permalinks like category and tag pages
* Fix - Brands to Scroll: bug fixed; now maximum brands to scroll for the widget is number of brands per page for this widget

= 3.6.5 =
* Fix - Shortcode work incorrect in new Divi theme
* Fix - On update from version 3.5 some brands do not displayed on admin area

= 3.6.4 =
* Enhancement - Compatibility version: Wordpress 5.8 and WooCommerce 5.5.2
* Fix - Products list
* Fix - Caching products
* Fix - Order in admin

= 3.6.3 =
* Enhancement - Compatibility version: WooCommerce 5.3
* Fix - Incompatibility with WPML and other plugins
* Fix - Russian language

= 3.6.2 =
Fixed bug: message 'Empty Term' in slider for multi-language sites

= 3.6.1 =
Hotfixes: brand description page, sorting non-latin brands by alphabet

= 3.6 =
* Enhancement - new brand properties (on the brand page): banner, URL to possible external site
* Enhancement - sort brands in widgets and shortcodes by rating, number of products, random or place Featured brands first
* Enhancement - group brands by category
* Enhancement - brands can have tooltips (text, shown on mouse over)
* Enhancement - in the plugin settings, all properties of the brand page are placed on a separate tab.
* Enhancement - new slider properties: change slide speed, change slide mode (fade/slide),
easing, dots under the slider, possibility to pick color for the dots
* Enhancement - new image properties for brands in widgets, shortcodes, on the Brand page, Shop page and Product page: width and height in px/%, fit (cover, contain, fill, none), align to text: left, right, above the text or under the text
* Enhancement - new options for sorting brands in widgets and shortcodes:
featured first, alphabetically, random, by number of products.
* Enhancement - there has been added a possibility to group brands by category (old shortcodes and widgets still work) in the widget WooCommerce Brand Catalog (former WooCommerce Brands By Name) and in the shortcode [brand_catalog] (former [brands_by_name])
* Enhancement - 'Use cache' checkbox
* Fix - brands set for the products are exported and imported with these products
* Fix - brands set for the products are duplicated with these products

= 3.5.3 =
* Fix - SECURITY ISSUE! Sanitize HTML tags for all settings. Custom JavaScript can be changed only by admin(Super admin for multisite).

= 3.5.2.2 =
* Enhancement - Compatibility version: Wordpress 5.7 and WooCommerce 5.1

= 3.5.2.1 =
* Enhancement - Compatibility version: WooCommerce 5.0

= 3.5.2 =
* Enhancement - compatibility version: PHP 8, Wordpress 5.6 and WooCommerce 4.9

= 3.5.1.9 =
* Enhancement - compatibility version: WooCommerce 4.5

= 3.5.1.8 =
* Enhancement - compatibility version: Wordpress 5.5 and WooCommerce 4.4
* Enhancement - link for brands_product_thumbnail shortcode

= 3.5.1.7 =
* Fix - PHP error WooCommerce shortcodes

= 3.5.1.6 =
* Enhancement - compatibility version: WooCommerce 4.3
* Enhancement - brands parameters for WooCommerce shortcodes
* Fix - per_page parameter for brands_products shortcode
* Fix - scroll slider issue

= 3.5.1.5 =
* Enhancement - compatibility version: Wordpress 5.4.1 and WooCommerce 4.1

= 3.5.1.4 =
* Enhancement - compatibility version: Wordpress 5.4 and WooCommerce 4.0

= 3.5.1.3 =
* Enhancement - compatibility version: Wordpress 5.3.2 and WooCommerce 3.9.1
* Fix - coupon limitation by brands that are working incorrectly

= 3.5.1.2 =
* Enhancement - compatibility version: Wordpress 5.3 and WooCommerce 3.8

= 3.5.1.1 =
* Fix - brands sorting for shortcode brands_by_name
* Fix - display empty div for brands, that do not have image or text

= 3.5.1 =
* Enhancement - new shortcode attributes (include/exclude) that allow to either add or remove brands with certain ID from the list of shortcodes
* Fix - description for shortcode

= 3.5.0.2 =
* Fix - links to BeRocket
* Fix - compatibility with other BeRocket plugins

= 3.5.0.1 =
* Fix - some notices displayed incorrectly
* Fix - compatibility with other plugins

= 3.5 =
* Enhancement - slider for brand links
* Enhancement - additional customization
* Enhancement - widget and shortcode for product brands list by name
* Enhancement - shortcode to display brand image on product page
* Enhancement - shortcode and widget to display information about brands
* Enhancement - option to display brand image on product pages

= 1.1.0.4 =
* Enhancement - compatibility with other BeRocket plugins

= 1.1.0.3 =
* Enhancement - security code

= 1.1.0.2 =
* Enhancement - security code

= 1.1.0.1 =
* Enhancement - brands in navigation menu
* Fix - preparation for WooCommerce 3.6.0

= 1.1 =
* Enhancement - new settings design
* Enhancement - new slider for brands

= 1.0.12.1 =
* Fix - compatibility with AJAX Filters

= 1.0.12 =
* Fix - subscription
* Fix - send request feature

= 1.0.11 =
* Enhancement - request box feature
* Enhancement - feedback box

= 1.0.10 =
* Upgrade - better positioning of the plugin menu items

= 1.0.9 =
* Upgrade - WordPress 4.9 compatibility

= 1.0.8 =
* Upgrade - convenient subscription
* Fix - updater fix

= 1.0.7 =
* Upgrade - recent woocommerce version support
* Upgrade - new Admin notices

= 1.0.6 =
* Upgrade - subscribe option
* Upgrade - better advertisement

= 1.0.5 =
* Fix - description
* Fix - premium plugin link to page with settings

= 1.0.4 =
* Compatibility with WooCommerce 3.0.0
* Fixes for widgets
* Better compatibility with WPML

= 1.0.3 =
* Small fixes

= 1.0.2 =
* Better support for PHP 5.2

= 1.0.1 =
* First public version
