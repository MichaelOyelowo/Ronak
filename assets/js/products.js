const products =[
    {
        id: 1, name: "Indigo Echo Drape", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 40000, originalPrice: 50000, image: "./assets/images/homepage/indigo.webp", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "Hand-dyed in the sacred pits using ancient resist techniques."
    },
    {
        id: 2, name: "Earth Tone", category: "customized-cotton", categoryLabel: "Customized Cotton",
        price: 20000, originalPrice: 25000, image: "./assets/images/homepage/earth_brown.webp", badge: "bestseller", badgeLabel: "Bestseller",
        description: "Customized cotton hand-loomed into a contemporary silhouette."
    },
    {
        id: 3, name: "Heritage Wrap", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 32000, image: "./assets/images/homepage/heritage.webp", badge: "sale", badgeLabel: "Sale",
        description: "Tissue chiffon wrap with intricate hand-dyed adire patterns."
    },
    {
        id: 4, name: "Midnight Sky Adire", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: null, image: "./assets/images/homepage/midnight_sky_adire.webp", badge: null, badgeLabel: null,
        description: "Heavy batik cotton in an oversized contemporary cut."
    },
    {
        id: 5, name: "Eleko Wrap", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: null, image: "./assets/images/products/cotton-batik/cotton-batik1.webp", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "Cassava paste resist batik wrap skirt."
    },
    {
        id: 6, name: "Ocean Dot Silk", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 35000, originalPrice: 42000, image: "./assets/images/products/cotton-batik/cotton-batik2.webp", badge: "sale", badgeLabel: "Sale",
        description: "Natural blue silk, hand-dyed using traditional methods."
    },
    {
        id: 7, name: "Azure Stripe Tunic", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: null, image: "./assets/images/products/cotton-batik/cotton-batik3.webp", badge: "bestseller", badgeLabel: "Bestseller",
        description: "Heavy drill blue striped batik with Adire green accents."
    },
    {
        id: 8, name: "Aso-Oke Inspired Drape", category: "customized-cotton", categoryLabel: "Customized Cotton",
        price: 25000, originalPrice: 30000, image: "./assets/images/products/cotton-batik/cotton-batik4.webp", badge: "sale", badgeLabel: "Sale",
        description: "Customized cotton drape inspired by traditional Aso-Oke weaving."
    },
    {
        id: 9, name: "Emerald Forest Cotton", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 24000, image: "./assets/images/products/silk-batik/batik1.webp", badge: "sale", badgeLabel: "Sale",
        description: "Green design batik cotton with celestial resist patterns."
    },
    {
        id: 10, name: "Deep Navy Shift", category: "customized-cotton", categoryLabel: "Customized Cotton",
        price: 25000, originalPrice: 32000, image: "./assets/images/products/silk-batik/batik2.webp", badge: "sale", badgeLabel: "Sale",
        description: "Rich navy blue tones in hand-dyed customized cotton."
    },
    {
        id: 11, name: "Sunlit Chiffon Drape", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 35000, originalPrice: null, image: "./assets/images/products/silk-batik/batik3.webp", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "Rich yellow-toned drape with classic Adire motifs."
    },
    {
        id: 12, name: "Kaleidoscope Wrap", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 32000, image: "./assets/images/products/silk-batik/batik4.webp", badge: "sale", badgeLabel: "Sale",
        description: "Flowing tissue chiffon featuring a fusion of vibrant patterns."
    },
    {
        id: 13, name: "Terracotta Classic", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: 18500, image: "./assets/images/products/tie-dye/tie-dye1.png", badge: "sale", badgeLabel: "Sale",
        description: "Warm brown with classic white patterns. Earthy and timeless."
    },
    {
        id: 14, name: "Blue Heritage Set", category: "customized-cotton", categoryLabel: "Customized Cotton",
        price: 20000, originalPrice: 24000, image: "./assets/images/products/tie-dye/tie-dye2.png", badge: "sale", badgeLabel: "Sale",
        description: "Authentic earth tones combined with deep indigo dyes."
    },
    {
        id: 15, name: "Royal Ocean Silk", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 40000, originalPrice: 50000, image: "./assets/images/products/tie-dye/tie-dye3.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "Classic blue & white indigo batik. Elegant and beautifully fluid."
    },
    {
        id: 16, name: "Crimson Teal Flow", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 30000, image: "./assets/images/products/tie-dye/tie-dye4.png", badge: "sale", badgeLabel: "Sale",
        description: "Bold red, indigo & teal. A vibrant heritage statement."
    },
    {
        id: 17, name: "Amethyst Gold Cotton", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 24000, image: "./assets/images/products/tissue-chiffon/chiffon1.png", badge: "sale", badgeLabel: "Sale",
        description: "Rich golden accents paired with deep purples. Timeless elegance."
    },
    {
        id: 18, name: "Golden Horizon Tunic", category: "customized-cotton", categoryLabel: "Customized Cotton",
        price: 25000, originalPrice: 32000, image: "./assets/images/products/tissue-chiffon/chiffon2.png", badge: "sale", badgeLabel: "Sale",
        description: "Bold black and deep navy base with striking golden-yellow motifs."
    },
    {
        id: 19, name: "Purple Haze Silk", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 35000, originalPrice: null, image: "./assets/images/products/tissue-chiffon/chiffon3.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "Purple & Indigo haze on premium silk. Soft and highly artistic."
    },
    {
        id: 20, name: "Heritage Stripes", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 15000, originalPrice: 18500, image: "./assets/images/products/tissue-chiffon/chiffon4.png", badge: "sale", badgeLabel: "Sale",
        description: "Classic brown and cream striped Adire with subtle traditional detailing."
    },
    {
        id: 21, name: "Osun Waves Tunic", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144946/adire22_f9qaol.webp", badge: "sale", badgeLabel: "Sale",
        description: "Organic wave patterns inspired by the flowing rivers of Osun."
    },
    {
        id: 22, name: "Ife Clay Midi", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144947/adire25_hj9jje.webp", badge: "sale", badgeLabel: "Sale",
        description: "Earthy terracotta and indigo resist-dyed patterns on breathable cotton."
    },
    {
        id: 23, name: "Geo Print", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144947/adire23_ohgbqd.webp", badge: "sale", badgeLabel: "Sale",
        description: "Sharp geometric motifs set against a deep charcoal base."
    },
    {
        id: 24, name: "Pink fabric", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144947/adire21_u8pxjc.webp", badge: "sale", badgeLabel: "Sale",
        description: "A subtle, sandy-toned fabric perfect for minimalists."
    },
    {
        id: 25, name: "Moon burst Tunic", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 24000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144947/adire24_xbjk6y.webp", badge: "sale", badgeLabel: "Sale",
        description: "Vibrant yellow bursts contrasting beautifully with dark dye."
    },
    {
        id: 26, name: "Market Shift", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144947/adire26_ny2tbs.webp", badge: "sale", badgeLabel: "Sale",
        description: "A lively, multi-patterned piece reflecting the energy of the market."
    },
    {
        id: 27, name: " Orchid Silk", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 40000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144947/adire27_uism4o.webp", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "Deep, luxurious purple silk that shimmers effortlessly in the light."
    },
    {
        id: 28, name: "Breeze Chiffon Veil", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144948/adire28_weywed.webp", badge: "sale", badgeLabel: "Sale",
        description: "Whisper-light chiffon with delicate, cloud-like indigo patterns."
    },
    {
        id: 29, name: "Green Fabric", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144952/adire30_i2abes.webp", badge: "sale", badgeLabel: "Sale",
        description: ""
    },
    {
        id: 30, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144953/adire33_l2gmse.webp", badge: "sale", badgeLabel: "Sale",
        description: ""
    },
    {
        id: 31, name: "Olive Grove", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 24000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144954/adire32_viple4.webp", badge: "sale", badgeLabel: "Sale",
        description: "Earthy green hues created using organic, natural dye mixtures."
    },
    {
        id: 32, name: "Night Print", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144954/adire31_pl6hkk.webp", badge: "sale", badgeLabel: "Sale",
        description: "Dark, moody, and highly contemporary cotton print."
    },
    {
        id: 33, name: "Sunset Orange Tunic", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144955/adire35_yxdn0q.webp", badge: "sale", badgeLabel: "Sale",
        description: "Warm, fiery orange tones mimicking the African sunset."
    },
    {
        id: 34, name: "Classic Adire", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144955/adire36_e6mwmi.webp", badge: "sale", badgeLabel: "Sale",
        description: "The quintessential Adire look. You can never go wrong with this."
    },
    {
        id: 35, name: "Goddess Wrap", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 40000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144956/adire39_oivdfm.webp", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "A breathtaking silk drape that feels like pure water against the skin."
    },
    {
        id: 36, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144957/adire37_ii2kvu.webp", badge: "sale", badgeLabel: "Sale",
        description: "Minimalist chiffon with extremely subtle, elegant dye touches."
    },
    {
        id: 37, name: "Monochrome Motif Set", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144962/adire46_cmedje.webp", badge: "sale", badgeLabel: "Sale",
        description: "Black and white perfection for the modern fashionista."
    },
    {
        id: 38, name: "Ede Artisanal Cotton", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 24000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144963/adire45_jf5mga.webp", badge: "sale", badgeLabel: "Sale",
        description: "Intricate, tightly-packed patterns showing incredible craftsmanship."
    },
    {
        id: 39, name: "Golden Hour Midi", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144964/adire50_ixajxp.webp", badge: "sale", badgeLabel: "Sale",
        description: "Radiant yellows and deep browns beautifully blended together."
    },
    {
        id: 40, name: "Cool vibrant Yellow", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: 18000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144964/adire49_gcftae.webp", badge: "sale", badgeLabel: "Sale",
        description: "Cool, dusty tones perfect for layering and styling."
    },
    {
        id: 41, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144965/adire53_z4maap.webp", badge: "sale", badgeLabel: "Sale",
        description: ""
    },
    {
        id: 42, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144965/adire51_lycqy6.webp", badge: "sale", badgeLabel: "Sale",
        description: "Classic Yoruba styling done the traditional way."
    },
    {
        id: 43, name: "Lush Forest Silk", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 40000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144966/adire56_j6g6po.webp", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "Deep emerald greens on our finest imported silk."
    },
    {
        id: 44, name: "Twilight Chiffon Throw", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144967/adire55_q526mw.webp", badge: "sale", badgeLabel: "Sale",
        description: "A dark, elegant chiffon piece that flows effortlessly."
    },
    {
        id: 45, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: 20000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776144967/adire54_afnguy.webp", badge: "sale", badgeLabel: "Sale",
        description: "Modern, sharp, and tailored for city life."
    },
    {
        id: 46, name: "Desert Rose Cotton", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 24000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776145250/adire57_wzdhup.webp", badge: "sale", badgeLabel: "Sale",
        description: "Soft pinks and sand tones mixed to perfection."
    },
    {
        id: 47, name: "Royal Crimson Cotton", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776145250/adire59_xgy1qd.webp", badge: "sale", badgeLabel: "Sale",
        description: "A rich, majestic red fabric commanding immediate attention."
    },
    {
        id: 48, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776145251/adire60_gnvnnp.webp", badge: "sale", badgeLabel: "Sale",
        description: ""
    },
    {
        id: 49, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776145251/adire58_zvirbx.webp", badge: "sale", badgeLabel: "Sale",
        description: ""
    },
    {
        id: 50, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776145254/adire61_brufzb.jpg", badge: "sale", badgeLabel: "Sale",
        description: "Warm, textured earth tones baked by the sun."
    },
    {
        id: 51, name: "Reef Silk", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 35000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776145255/adire63_jhkbaa.webp", badge: "new-arrival", badgeLabel: "New Arrival",
        description: ""
    },
    {
        id: 52, name: "Ethereal Chiffon Drape", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776145255/adire62_gg7xdg.webp", badge: "sale", badgeLabel: "Sale",
        description: "Lightweight and elegant, crafted with meticulous attention to detail."
    },
    {
        id: 53, name: "Chiffon Veil", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776145255/adire65_e7vz7n.webp", badge: "sale", badgeLabel: "Sale",
        description: "A stunning black and white piece featuring timeless motifs."
    },
    {
        id: 54, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776145255/adire64_jyghwy.webp", badge: "sale", badgeLabel: "Sale",
        description: ""
    },
    {
        id: 55, name: "Vibrant Indigo Set", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 24000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776145256/adire67_xcotzj.webp", badge: "sale", badgeLabel: "Sale",
        description: "The classic deep blue you know and love."
    },
    {
        id: 56, name: "Ebony & Gold Silk", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 40000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776145259/adire66_u4ybuq.webp", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "Luxurious black silk shot through with golden resist lines."
    },
    {
        id: 57, name: "Ruby Tissue Wrap", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776145259/adire70_orhxkt.webp", badge: "sale", badgeLabel: "Sale",
        description: "A passionate, flowing red chiffon piece."
    },
    {
        id: 58, name: "Breeze Chiffon", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776145260/adire69_emvxdl.webp", badge: "sale", badgeLabel: "Sale",
        description: "Cool and airy, the perfect accessory for any outfit."
    },
    {
        id: 59, name: "Amethyst Glow Silk", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 35000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156005/adire9_beditt.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "A glowing purple hue that commands the room."
    },
    {
        id: 60, name: "Sunset Flow Wrap", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156084/adire1_xytvvw.png", badge: "sale", badgeLabel: "Sale",
        description: "An effortlessly chic addition to your wardrobe."
    },
    {
        id: 61, name: "River design", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156085/adire4_wzyhck.png", badge: "sale", badgeLabel: "Sale",
        description: "Fluid, watery designs that drape perfectly."
    },
    {
        id: 62, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 24000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156086/adire3_uz859p.png", badge: "sale", badgeLabel: "Sale",
        description: "Authentic, rugged, and beautifully patterned."
    },
    {
        id: 63, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156086/adire2_ujwcqr.png", badge: "sale", badgeLabel: "Sale",
        description: "Earthy warmth captured in every thread."
    },
    {
        id: 64, name: "", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 40000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156086/adire6_cxsuxb.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "A premium silk piece featuring vibrant sunset colors."
    },
    {
        id: 65, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156087/adire8_y5ko4e.png", badge: "sale", badgeLabel: "Sale",
        description: "A subtle pink and beige hue that softens any look."
    },
    {
        id: 66, name: "Emerald", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156087/adire7_vdpp3c.png", badge: "sale", badgeLabel: "Sale",
        description: "Deep greens that flow beautifully in the wind."
    },
    {
        id: 67, name: "Ruby", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156087/adire9_ozwgpb.png", badge: "sale", badgeLabel: "Sale",
        description: "A passionate throw for evening wear."
    },
    {
        id: 68, name: "Charcoal Geo Cotton", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 24000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156087/adire10_wc2z0a.png", badge: "sale", badgeLabel: "Sale",
        description: "Sharp black and grey patterns for a modern aesthetic."
    },
    {
        id: 69, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156091/adire11_ntbo1l.png", badge: "sale", badgeLabel: "Sale",
        description: "Muted, elegant, and highly wearable."
    },
    {
        id: 70, name: "", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 35000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156092/adire12_udbwx2.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "The ultimate luxury statement piece for evening events."
    },
    {
        id: 71, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156092/adire13_oob68v.png", badge: "sale", badgeLabel: "Sale",
        description: "Lightweight and elegant, crafted with meticulous attention."
    },
    {
        id: 72, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156092/adire16_swfxky.png", badge: "sale", badgeLabel: "Sale",
        description: ""
    },
    {
        id: 73, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156092/adire14_ish9tu.png", badge: "sale", badgeLabel: "Sale",
        description: "Made precisely for the discerning buyer."
    },
    {
        id: 74, name: "", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 40000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156093/adire15_qvlwfd.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "A heavy, gorgeous silk that screams royalty."
    },
    {
        id: 75, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156093/adire17_ihonko.png", badge: "sale", badgeLabel: "Sale",
        description: "A calming, aquatic-themed wrap."
    },
    {
        id: 76, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156096/adire18_jbhtyi.png", badge: "sale", badgeLabel: "Sale",
        description: "Golden and sandy tones on flowing tissue fabric."
    },
    {
        id: 77, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156097/adire19_hihmso.png", badge: "sale", badgeLabel: "Sale",
        description: "Perfect for a breezy evening."
    },
    {
        id: 78, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 24000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156097/adire20_nxxrmi.png", badge: "sale", badgeLabel: "Sale",
        description: "The absolute standard of traditional Adire."
    },
    {
        id: 79, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156098/adire23_hotwy0.png", badge: "sale", badgeLabel: "Sale",
        description: "Vibrant, busy, and full of life."
    },
    {
        id: 80, name: "", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 35000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156098/adire21_a7pvmi.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "A golden silk piece that catches every ray of light."
    },
    {
        id: 81, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156098/adire22_iffvfx.png", badge: "sale", badgeLabel: "Sale",
        description: "A statement piece in fiery red."
    },
    {
        id: 82, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156098/adire24_hbzziz.png", badge: "sale", badgeLabel: "Sale",
        description: "Simple black and white elegance."
    },
    {
        id: 83, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156102/adire25_hn3j7f.png", badge: "sale", badgeLabel: "Sale",
        description: "Deep aquatic tones meeting organic hand-drawn motifs."
    },
    {
        id: 84, name: "", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 40000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156103/adire27_b75bkc.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "Stunning pink and orange silk dyes."
    },
    {
        id: 85, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 24000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156103/adire29_sboxet.png", badge: "sale", badgeLabel: "Sale",
        description: "An incredibly lightweight, almost translucent weave."
    },
    {
        id: 86, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156103/adire28_lfrbyz.png", badge: "sale", badgeLabel: "Sale",
        description: "Soft to the touch and easy on the eyes."
    },
    {
        id: 87, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156104/adire30_amauby.png", badge: "sale", badgeLabel: "Sale",
        description: "Deep evening colors for an upscale look."
    },
    {
        id: 88, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156106/adire32_snvcse.png", badge: "sale", badgeLabel: "Sale",
        description: "Yellow and gold tones that radiate warmth."
    },
    {
        id: 89, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156108/adire34_ogtqz2.png", badge: "sale", badgeLabel: "Sale",
        description: "Inspired by the rich color of the Zobo leaf."
    },
    {
        id: 90, name: "", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 35000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156108/adire35_dp4zmf.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "Black silk accented with striking gold patterns."
    },
    {
        id: 91, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 24000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156108/adire33_iog5xj.png", badge: "sale", badgeLabel: "Sale",
        description: "Cool, dry, and elegantly styled."
    },
    {
        id: 92, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156109/adire36_htxsq9.png", badge: "sale", badgeLabel: "Sale",
        description: "A wash of watery blues on light fabric."
    },
    {
        id: 93, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156110/adire39_vja1vl.png", badge: "sale", badgeLabel: "Sale",
        description: "Muted earth tones that match the season."
    },
    {
        id: 94, name: "", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 40000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156110/adire37_iyhrgq.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "A gorgeous jewel-toned accessory piece."
    },
    {
        id: 95, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156111/adire40_olrc9s.png", badge: "sale", badgeLabel: "Sale",
        description: "Soft pinks intersecting with earthy browns."
    },
    {
        id: 96, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156111/adire38_w2q87l.png", badge: "sale", badgeLabel: "Sale",
        description: "A lush, vibrant green statement piece."
    },
    {
        id: 97, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156111/adire41_b0erny.png", badge: "sale", badgeLabel: "Sale",
        description: "A striking red piece that commands attention."
    },
    {
        id: 98, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 24000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156114/adire42_hnuvdr.png", badge: "sale", badgeLabel: "Sale",
        description: "Deep, satisfying brown tones with crisp white resist."
    },
    {
        id: 99, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156115/adire43_cjipjx.png", badge: "sale", badgeLabel: "Sale",
        description: "Flowing indigo patterns on a comfortable tunic."
    },
    {
        id: 100, name: "", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 35000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156115/adire44_ywl9lc.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "A premium drape featuring deep green botanical motifs."
    },
    {
        id: 101, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156116/adire46_hjzq7w.png", badge: "sale", badgeLabel: "Sale",
        description: "A delicate addition to your everyday attire."
    },
    {
        id: 102, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156116/adire45_i7oe4q.png", badge: "sale", badgeLabel: "Sale",
        description: "Simple elegance in black and white."
    },
    {
        id: 103, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156117/adire47_jm1ur1.png", badge: "sale", badgeLabel: "Sale",
        description: "Showcasing the authentic cassava paste resist technique."
    },
    {
        id: 104, name: "", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 40000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156117/adire48_wftapk.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "A regal red silk wrap for your most important events."
    },
    {
        id: 105, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 24000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156118/adire49_mrqsnt.png", badge: "sale", badgeLabel: "Sale",
        description: "Sharp, contrasting black and white geometric shapes."
    },
    {
        id: 106, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156120/adire50_wrhfkf.png", badge: "sale", badgeLabel: "Sale",
        description: "Warm desert hues translated onto delicate fabric."
    },
    {
        id: 107, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156121/adire52_muchwa.png", badge: "sale", badgeLabel: "Sale",
        description: "Evening purples and blues mixed flawlessly."
    },
    {
        id: 108, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156121/adire51_slnna6.png", badge: "sale", badgeLabel: "Sale",
        description: "A comfortable, everyday piece celebrating the earth."
    },
    {
        id: 109, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156122/adire54_k6kzic.png", badge: "sale", badgeLabel: "Sale",
        description: "Inspired by the bustling, vibrant city of Abeokuta."
    },
    {
        id: 110, name: "", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 35000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156122/adire53_qfj6b7.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "A soft, dreamy purple silk experience."
    },
    {
        id: 111, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 24000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156122/adire55_mnnk7l.png", badge: "sale", badgeLabel: "Sale",
        description: "A jewel-toned accessory to elevate your look."
    },
    {
        id: 112, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156123/adire56_b0pl0i.png", badge: "sale", badgeLabel: "Sale",
        description: "Cool blue and white tones mimicking sea spray."
    },
    {
        id: 113, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156125/adire57_fwjt97.png", badge: "sale", badgeLabel: "Sale",
        description: "Soft, muted pinks for a delicate aesthetic."
    },
    {
        id: 114, name: "", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 40000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156126/adire59_qcnmay.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "Pristine white silk featuring subtle, ghostly indigo motifs."
    },
    {
        id: 115, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156127/adire58_dh3rwz.png", badge: "sale", badgeLabel: "Sale",
        description: "Deep green chiffon that drapes to perfection."
    },
    {
        id: 116, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156128/adire60_olscmh.png", badge: "sale", badgeLabel: "Sale",
        description: "An incredibly vibrant and flowing red accent piece."
    },
    {
        id: 117, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156128/adire62_lghtx8.png", badge: "sale", badgeLabel: "Sale",
        description: "Perfect for cool evenings out."
    },
    {
        id: 118, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 24000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156128/adire61_psbwbk.png", badge: "sale", badgeLabel: "Sale",
        description: "Modern, sharp, and highly structured geometric styling."
    },
    {
        id: 119, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156129/adire63_yqfyso.png", badge: "sale", badgeLabel: "Sale",
        description: "Earthy tones baked into the finest local cotton."
    },
    {
        id: 120, name: "", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 35000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156129/adire64_svxzud.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "A spectacular blend of oranges and yellows on pure silk."
    },
    {
        id: 121, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156130/adire65_qhkrs1.png", badge: "sale", badgeLabel: "Sale",
        description: "Airy, soft, and meticulously hand-dyed."
    },
    {
        id: 122, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156131/adire66_y9xv33.png", badge: "sale", badgeLabel: "Sale",
        description: "A gorgeous minimalist approach to traditional Adire."
    },
    {
        id: 123, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156132/adire68_czmuxj.png", badge: "sale", badgeLabel: "Sale",
        description: "The absolute standard. A wardrobe essential."
    },
    {
        id: 124, name: "", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 40000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156137/adire67_i5zmzp.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "Rich, powerful red tones on the finest imported silk."
    },
    {
        id: 125, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 24000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156138/adire69_afrifz.png", badge: "sale", badgeLabel: "Sale",
        description: "High-contrast black and white for maximum visual impact."
    },
    {
        id: 126, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156141/adire71_e4qiwv.png", badge: "sale", badgeLabel: "Sale",
        description: "A warm, glowing fabric inspired by the sands."
    },
    {
        id: 127, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156143/adire74_upjoqr.png", badge: "sale", badgeLabel: "Sale",
        description: "Subtle, dark elegance with beautiful flowing movement."
    },
    {
        id: 128, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156144/adire75_vg3kvk.png", badge: "sale", badgeLabel: "Sale",
        description: "A satisfying mix of rich browns and crisp white linework."
    },
    {
        id: 129, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156145/adire76_wrl2vp.png", badge: "sale", badgeLabel: "Sale",
        description: "Earthy, natural greens perfect for a grounded aesthetic."
    },
    {
        id: 130, name: "", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 35000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156146/adire77_p7y0lr.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "Golden and yellow tones that radiate warmth."
    },
    {
        id: 131, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 24000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156150/adire78_cg91co.png", badge: "sale", badgeLabel: "Sale",
        description: "An incredibly vibrant and flowing red accent piece."
    },
    {
        id: 132, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156150/adire70_ehb2mo.png", badge: "sale", badgeLabel: "Sale",
        description: "A wash of watery blues on our lightest fabric."
    },
    {
        id: 133, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156154/adire80_amfzym.png", badge: "sale", badgeLabel: "Sale",
        description: "Cool, dusty tones perfect for layering and styling."
    },
    {
        id: 134, name: "", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 40000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156155/adire81_gbixgr.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "A glowing purple hue that commands the room."
    },
    {
        id: 135, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 20000, originalPrice: 25000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156156/adire79_hiv0er.png", badge: "sale", badgeLabel: "Sale",
        description: "Soft pinks intersecting with earthy browns."
    },
    {
        id: 136, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 25000, originalPrice: 30000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156156/adire73_uuifa4.png", badge: "sale", badgeLabel: "Sale",
        description: "A lush, vibrant green statement piece."
    },
    {
        id: 137, name: "", category: "tissue-chiffon", categoryLabel: "Tissue Chiffon",
        price: 15000, originalPrice: 18500, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156157/adire72_bgy1ni.png", badge: "sale", badgeLabel: "Sale",
        description: "A passionate throw for elegant evening wear."
    },
    {
        id: 138, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 20000, originalPrice: 24000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156159/adire84_pc2lhs.png", badge: "sale", badgeLabel: "Sale",
        description: "Sharp black and grey patterns for a modern aesthetic."
    },
    {
        id: 139, name: "", category: "batik-cotton", categoryLabel: "Batik Cotton",
        price: 25000, originalPrice: 32000, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156159/adire85_f6bq6p.png", badge: "sale", badgeLabel: "Sale",
        description: "Muted, elegant, and highly wearable."
    },
    {
        id: 140, name: "", category: "silk-batik", categoryLabel: "Silk Batik",
        price: 35000, originalPrice: null, image: "https://res.cloudinary.com/dweacouwm/image/upload/v1776156161/adire83_xuwrjv.png", badge: "new-arrival", badgeLabel: "New Arrival",
        description: "The ultimate luxury statement piece for formal events."
    }
];