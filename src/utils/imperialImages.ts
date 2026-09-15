// Helper to generate 22 distinct imperial product gallery angles/shots per product
export const generate22ImperialPhotos = (productId: string, baseKeywords: string[]): string[] => {
  const angleThemes = [
    '01_front_master_shot',
    '02_side_profile_45deg',
    '03_top_down_flatlay',
    '04_macro_texture_detail',
    '05_handheld_human_scale',
    '06_unboxing_packaging_luxury',
    '07_lifestyle_outdoor_daylight',
    '08_studio_cinematic_lighting',
    '09_materials_craftsmanship_zoom',
    '10_product_in_action_live',
    '11_side_angle_left',
    '12_side_angle_right',
    '13_accessories_bundled_view',
    '14_color_variants_spread',
    '15_durability_stress_test',
    '16_size_dimension_infographic',
    '17_night_mode_led_accent',
    '18_premium_gift_box_presentation',
    '19_close_up_buttons_ports',
    '20_real_customer_unboxing',
    '21_waterproof_resistance_showcase',
    '22_certification_imperial_seal'
  ];

  // Specific curated high-res Unsplash photography for e-commerce products
  const curatedCollections: Record<string, string[]> = {
    'puluz-mic-wireless': [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520523839898-507124cd537a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581291518655-9523b932edd0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ]
  };

  if (curatedCollections[productId] && curatedCollections[productId].length === 22) {
    return curatedCollections[productId];
  }

  // Generate 22 stable images with visual variation query strings
  const fallbackBase = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
    'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6',
    'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82',
    'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86'
  ];

  return angleThemes.map((theme, idx) => {
    const base = fallbackBase[idx % fallbackBase.length];
    return `${base}?auto=format&fit=crop&w=800&q=80&sig=${productId}_${idx}_${theme}`;
  });
};
