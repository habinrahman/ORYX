/**
 * ORYX photography — **brochure-grade pool** (owner-approval bar).
 *
 * Only assets that read as **commissioned hospitality collateral**: clean composition,
 * sharp decode, no reel grain, no table clutter (menus, bottles), no social stickers,
 * no partial vehicles. Everything else stays in `ORYX_PHOTO_REJECTED` or unused on disk.
 *
 * **Hero:** `main-entrance.jpg` — full-res main entrance (boardwalk, palms, roof).
 * Optional re-encode from a new source: `npm run images:hero-main` (overwrites
 * `hero-main-entrance.jpg`; switch `hero` path in this file if you prefer that output).
 *
 * Also: two campus angles, overhead thali, mandi, Indo-Chinese,
 * layered coffee, brand lockup.
 *
 * Re-audit: `npm run images:audit`
 */
export const O = "/oryx" as const;
const X = `${O}/ig_extracted` as const;

export const ORYX_CURATED = {
  /** Main entrance — high-res daylight architectural master */
  hero: `${O}/main-entrance.jpg`,
  /** Strip / rail — same main entrance as hero for consistent arrival story */
  estateDaylight: `${O}/main-entrance.jpg`,
  /** Sharpest large-format food frame in the library (overhead thali) */
  grandThaliOverhead: `${X}/C_XVsJWSGSD_330065_22.jpg`,
  mandiPlatter: `${X}/Ch8xpQwPMQU_230139_24.jpg`,
  indoChinesePair: `${X}/CgHUixavita_291525_21.jpg`,
  /** Brochure “grounds” spread — lawns, pool, architecture */
  campusLawnReflections: `${X}/CgHUixavita_354956_19.jpg`,
  /** Second campus angle — pairs with lawn shot in spreads */
  campusWide: `${X}/Ch8xpQwPMQU_354956_19.jpg`,
  /** Controlled beverage hero — glass, layers, stone wall */
  eveningCoffee: `${X}/Ch8xpQwPMQU_280336_36.jpg`,
  /** Print-ready Oryx Village lockup (crisp type + mark) */
  brandLockup: `${X}/C_XVsJWSGSD_41260_71.jpg`,
  /** Legacy export names — same brochure assets as above */
  heritageOutdoorSeating: `${O}/main-entrance.jpg`,
  masalaFishDuo: `${X}/C_XVsJWSGSD_330065_22.jpg`,
  friedRiceBowls: `${X}/Ch8xpQwPMQU_280336_36.jpg`,
  lobbyReception: `${X}/Ch8xpQwPMQU_280336_36.jpg`,
  villageCafeSign: `${X}/Ch8xpQwPMQU_354956_19.jpg`,
} as const;

/** UI-facing aliases — maps sections to the brochure pool */
export const ORYX_SHARP_10 = {
  hero: ORYX_CURATED.hero,
  spreadWide: ORYX_CURATED.estateDaylight,
  banquet: ORYX_CURATED.grandThaliOverhead,
  banquetFeast: ORYX_CURATED.mandiPlatter,
  estateExterior: ORYX_CURATED.campusWide,
  editorialStill: ORYX_CURATED.campusLawnReflections,
  thaliOverhead: ORYX_CURATED.grandThaliOverhead,
  dishMandi: ORYX_CURATED.mandiPlatter,
  dishParotta: ORYX_CURATED.indoChinesePair,
  /** Third signature — grand thali (only overhead plate that clears brochure bar) */
  masalaFish: ORYX_CURATED.grandThaliOverhead,
  thaliFeastOverhead: ORYX_CURATED.eveningCoffee,
  lobbyInterior: ORYX_CURATED.eveningCoffee,
  friedRiceBowls: ORYX_CURATED.eveningCoffee,
  brandLockup: ORYX_CURATED.brandLockup,
} as const;

export const ORYX_PHOTO_REJECTED = [
  "ig-reel-grand-vertical.jpg",
  "ig-reel-feast-wide.jpg",
  "ig-reel-table-hero.jpg",
  "hero-village-cafe-guests-day.png",
  "ig-reel-kitchen-story.jpg",
  "hero-village-thatch-dining-night.png",
  "grand-entrance-boardwalk-night.png",
  "tandoori-feast-round-platter.png",
  "grand-thali-assorted-curries.png",
  "editorial-pasta-cheese-pull-vertical.png",
  "epic-feast-spread-table.png",
  "grand-thali-feast-overhead.png",
  "grand-thali-silver-service.png",
  "feast-kebab-mandi-overhead.png",
  "mocktails-tropical-trio.png",
  "signature-squid-roast-kerala.png",
  "campus-wayfinding-signs-night.png",
  "village-feast-parotta-grill.png",
  "signature-manchow-soup.png",
  "indulgent-brownie-sundae.png",
  "signature-mixed-grill-board.png",
  "signature-karimeen-pollichathu.png",
  "village-cafe-thatch-night.png",
  "village-dining-hall-kerala.png",
  "cafe-layered-cold-coffee.png",
  "editorial-estate-evening.png",
  "editorial-split-hero.png",
  "editorial-feast-thali-overhead.png",
  "ig-reel-portrait-hero.jpg",
  "heritage-lobby-reception.png",
  "signature-mandi-masala-fish-duo.png",
  "Ch8xpQwPMQU_221344_25.jpg",
  "C2SPFVcymWS_207342_38.jpg",
  "Ch8xpQwPMQU_146808_46.jpg",
  "C054FWmrZHW_567058_13.jpg",
] as const;
