var app = new Vue({
  el: "#app",
  data: {
    product: {
      brand: "Vue Mastery",
      name: "Socks", // 原本的 key
      selectedVariant: 0,
      link: "https://www.google.com.tw/",
      inventory: 28, // 測試用，1~9 會顯示 "Out of Stock"
      onSale: true,
      description: "Comfortable and stylish socks",
      variants: [
        {
          type: "colors",
          variantId: 2234,
          variantColor: "yellow",
          variantImage: "./images/socks-unsplash-1.jpg",
          variantQuantity: 15,
        },
        {
          type: "colors",
          variantId: 2235,
          variantColor: "green",
          variantImage: "./images/socks-unsplash-2.jpg",
          variantQuantity: 0,
        },
      ],
      sizes: [
        {
          type: "sizes",
          variantId: 13,
          variantSize: "25cm",
          variantImage: "./images/socks-unsplash-3.jpg",
          variantQuantity: 0,
        },
        {
          type: "sizes",
          variantId: 24,
          variantSize: "18cm",
          variantImage: "./images/socks-unsplash-4.jpg",
          variantQuantity: 15,
        },
      ],
    },
    cartNum: 0,
    image: "./images/socks-unsplash-1.jpg", // 預設圖片
    selectedItem: null, // 用於標記當前選擇的顏色
  },
  methods: {
    addToCart() {
      this.cartNum += 1;
    },
    updateProduct(index, type) {
      this.product.selectedVariant = index;
      this.selectedItem = type;
    },
    removeFromCart() {
      if (this.cartNum > 0) {
        this.cartNum -= 1;
      } else {
        this.cartNum = 0; // 確保不會變成負數
      }
    },
  },
  computed: {
    title() {
      return this.product.brand + " " + this.product.name;
    },
    computedImage() {
      return this.selectedItem === "colors"
        ? this.product.variants[this.product.selectedVariant]?.variantImage ||
            "./images/socks-unsplash-1.jpg"
        : this.product.sizes[this.product.selectedVariant]?.variantImage ||
            "./images/socks-unsplash-1.jpg";
    },
    onSale() {
      // 返回顏色或尺寸的數量，若該數量為 0，則視為 "Out of Stock"
      return this.selectedItem === "colors"
        ? this.product.variants[this.product.selectedVariant]?.variantQuantity >
            0
        : this.product.sizes[this.product.selectedVariant]?.variantQuantity > 0;
    },
    saleMessage(){
      if (this.product.onSale) {
        return `${this.product.brand} ${this.product.name} is currently on sale!`;
      } else {
        return `${this.product.brand} ${this.product.name} is not on sale.`;
      }
    }
  },
});

// 在 `product` 物件中新增 `description` 屬性
// app.$set(app.product, "description", "A pair of warm, fuzzy socks");
