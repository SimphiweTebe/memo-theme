<?php

/*  Register Scripts and Style */

function memo_scripts() {

	// Stylesheet.
    wp_enqueue_style( 'memo-style-dist', get_template_directory_uri() . '/dist/bundle.css');
    // Load Scripts
    wp_enqueue_script( 'memo-script', get_template_directory_uri() . '/dist/main.js' , array(), '1.0', true );

	$url = trailingslashit( home_url() );
	$path = trailingslashit( parse_url( $url, PHP_URL_PATH ) );

	wp_scripts()->add_data( 'memo-script', 'data', sprintf( 'var memoSettings = %s;', wp_json_encode( array(
		'title' => get_bloginfo( 'name', 'display' ),
		'path' => $path,
		'URL' => array(
			'api' => esc_url_raw( get_rest_url( null, '/wp/v2/' ) ),
			'root' => esc_url_raw( $url ),
		)
	) ) ) );
}

add_action( 'wp_enqueue_scripts', 'memo_scripts' );

/* COURSES POST TYPE */
function courses_post_type() {
 
        $labels = array(
            'name'                => _x( 'Courses', 'Post Type General Name'),
            'singular_name'       => _x( 'Course', 'Post Type Singular Name'),
            'menu_name'           => __( 'Courses'),
            'all_items'           => __( 'All Courses'),
            'view_item'           => __( 'View Course'),
            'add_new_item'        => __( 'Add New Course'),
            'add_new'             => __( 'Add New'),
            'edit_item'           => __( 'Edit Course'),
            'update_item'         => __( 'Update Course'),
            'search_items'        => __( 'Search Course'),
            'not_found'           => __( 'Not Found'),
            'not_found_in_trash'  => __( 'Not found in Trash'),
        );
         
        $args = array(
            'label'               => __( 'courses'),
            'description'         => __( 'Courses news and reviews'),
            'labels'              => $labels,
            'supports'            => array( 'title', 'editor', 'excerpt', 'author', 'thumbnail', 'revisions', 'custom-fields' ),
            'taxonomies'          => array( 'genres' ),
            'hierarchical'        => false,
            'public'              => true,
            'show_ui'             => true,
            'show_in_menu'        => true,
            'show_in_nav_menus'   => true,
            'show_in_admin_bar'   => true,
            'menu_position'       => 5,
            'can_export'          => true,
            'has_archive'         => true,
            'exclude_from_search' => false,
            'publicly_queryable'  => true,
            'capability_type'     => 'post',
            'show_in_rest' => true
            
     
        );
         
        register_post_type( 'course', $args );
     
    }
    
add_action( 'init', 'courses_post_type', 0 );

//ADD COURSE TERMS
add_action( 'init', 'course_topics_taxonomy', 0 );
 
function course_topics_taxonomy() {
 
  $labels = array(
    'name' => _x( 'Topics', 'taxonomy general name' ),
    'singular_name' => _x( 'Topic', 'taxonomy singular name' ),
    'search_items' =>  __( 'Search Topics' ),
    'all_items' => __( 'All Topics' ),
    'parent_item' => __( 'Parent Topic' ),
    'parent_item_colon' => __( 'Parent Topic:' ),
    'edit_item' => __( 'Edit Topic' ), 
    'update_item' => __( 'Update Topic' ),
    'add_new_item' => __( 'Add New Topic' ),
    'new_item_name' => __( 'New Topic Name' ),
    'menu_name' => __( 'Topics' ),
  );    
 
  register_taxonomy('topics',array('course'), array(
    'hierarchical' => true,
    'labels' => $labels,
    'show_ui' => true,
    'show_admin_column' => true,
    'query_var' => true,
    'rewrite' => array( 'slug' => 'topic' ),
    'show_in_rest' => true
  ));
 
}

/* Add post image support */
add_theme_support( 'post-thumbnails' );


/*
|--------------------------------------------------------------------------
| Prepare REST
|--------------------------------------------------------------------------
*/

//PREPARE IMAGES
function ws_register_images_field() {
    register_rest_field( 
        'course',
        'images',
        array(
            'get_callback'    => 'ws_get_images_urls',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field( 
        'page',
        'images',
        array(
            'get_callback'    => 'ws_get_images_urls',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

add_action( 'rest_api_init', 'ws_register_images_field' );

function ws_get_images_urls( $object, $field_name, $request ) {
    $medium = wp_get_attachment_image_src( get_post_thumbnail_id( $object->id ), 'card_size' );
    $medium_url = $medium['0'];

    $large = wp_get_attachment_image_src( get_post_thumbnail_id( $object->id ), 'large' );
    $large_url = $large['0'];

    // Returns Array of Term Names for "my_taxonomy".
    $term_list = get_the_terms( $post_id, 'topics' );

    return array(
        'card_image' => $medium_url,
        'banner_image'  => $large_url,
        'course_topic' => $term_list[0]
    );
}

//PREPARE FIELDS
function memo_register_fields() {
	
    // Add Published Date
	register_rest_field( 'course',
        'published_date',
        array(
            'get_callback'		=> 'memo_published_date',
            'update_callback'	=> null,
            'schema'			=> null
        )
    );
}


//PUBLISHED DATE
function memo_published_date( $object, $field_name, $request ) {
	return get_the_time('F j, Y');
}


//ADD TO REST
add_action( 'rest_api_init', 'memo_register_fields' );

//ADD COURSE ACF FIELDS TO REST
function create_course_ACF_meta_in_REST() {
    $postypes_to_exclude = ['acf-field-group','acf-field'];
    $extra_postypes_to_include = ["course"];
    $post_types = array_diff(get_post_types(["_builtin" => false], 'names'),$postypes_to_exclude);

    array_push($post_types, $extra_postypes_to_include);

    foreach ($post_types as $post_type) {
        register_rest_field( $post_type, 'ACF', [
            'get_callback'    => 'expose_ACF_fields',
            'schema'          => null,
       ]
     );
    }

}

function expose_ACF_fields( $object ) {
    $ID = $object['id'];
    return get_fields($ID);
}

add_action( 'rest_api_init', 'create_course_ACF_meta_in_REST' );