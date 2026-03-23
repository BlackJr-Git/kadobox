import { relations } from "drizzle-orm"
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  integer,
  decimal,
  date,
  pgEnum,
} from "drizzle-orm/pg-core"

// ============================================================
// ENUMS
// ============================================================

export const genderEnum = pgEnum("gender", [
  "homme",
  "femme",
  "unisexe",
  "enfant",
])

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
])

export const wrappingTypeEnum = pgEnum("wrapping_type", [
  "standard",
  "premium",
  "luxury",
])

// ============================================================
// AUTH (Better Auth)
// ============================================================

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)]
)

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)]
)

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
)

// ============================================================
// CATALOGUE
// ============================================================

export const occasion = pgTable("occasion", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
  color: text("color"),
  image: text("image"),
  sortOrder: integer("sort_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const category = pgTable(
  "category",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    image: text("image"),
    parentId: text("parent_id"),
    sortOrder: integer("sort_order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("category_parentId_idx").on(table.parentId)]
)

export const product = pgTable(
  "product",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    shortDescription: text("short_description"),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    compareAtPrice: decimal("compare_at_price", { precision: 10, scale: 2 }),
    sku: text("sku"),
    stock: integer("stock").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    gender: genderEnum("gender").default("unisexe").notNull(),
    ageRange: text("age_range"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("product_isActive_idx").on(table.isActive),
    index("product_isFeatured_idx").on(table.isFeatured),
  ]
)

export const productImage = pgTable(
  "product_image",
  {
    id: text("id").primaryKey(),
    productId: text("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    alt: text("alt"),
    sortOrder: integer("sort_order").default(0).notNull(),
  },
  (table) => [index("productImage_productId_idx").on(table.productId)]
)

export const productOccasion = pgTable(
  "product_occasion",
  {
    productId: text("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    occasionId: text("occasion_id")
      .notNull()
      .references(() => occasion.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("productOccasion_productId_idx").on(table.productId),
    index("productOccasion_occasionId_idx").on(table.occasionId),
  ]
)

export const productCategory = pgTable(
  "product_category",
  {
    productId: text("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    categoryId: text("category_id")
      .notNull()
      .references(() => category.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("productCategory_productId_idx").on(table.productId),
    index("productCategory_categoryId_idx").on(table.categoryId),
  ]
)

// ============================================================
// COMMANDES
// ============================================================

export const shippingAddress = pgTable(
  "shipping_address",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    fullName: text("full_name").notNull(),
    phone: text("phone").notNull(),
    addressLine1: text("address_line_1").notNull(),
    addressLine2: text("address_line_2"),
    city: text("city").notNull(),
    province: text("province"),
    country: text("country").default("CD").notNull(),
    isDefault: boolean("is_default").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("shippingAddress_userId_idx").on(table.userId)]
)

export const order = pgTable(
  "order",
  {
    id: text("id").primaryKey(),
    orderNumber: text("order_number").notNull().unique(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    status: orderStatusEnum("status").default("pending").notNull(),
    subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
    shippingCost: decimal("shipping_cost", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
    total: decimal("total", { precision: 10, scale: 2 }).notNull(),
    shippingAddressId: text("shipping_address_id").references(
      () => shippingAddress.id
    ),
    notes: text("notes"),
    paymentMethod: text("payment_method"),
    paymentReference: text("payment_reference"),
    paidAt: timestamp("paid_at"),
    shippedAt: timestamp("shipped_at"),
    deliveredAt: timestamp("delivered_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("order_userId_idx").on(table.userId),
    index("order_status_idx").on(table.status),
  ]
)

export const orderItem = pgTable(
  "order_item",
  {
    id: text("id").primaryKey(),
    orderId: text("order_id")
      .notNull()
      .references(() => order.id, { onDelete: "cascade" }),
    productId: text("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "restrict" }),
    quantity: integer("quantity").default(1).notNull(),
    unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
    totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  },
  (table) => [index("orderItem_orderId_idx").on(table.orderId)]
)

export const giftCustomization = pgTable("gift_customization", {
  id: text("id").primaryKey(),
  orderItemId: text("order_item_id")
    .notNull()
    .references(() => orderItem.id, { onDelete: "cascade" })
    .unique(),
  message: text("message"),
  senderName: text("sender_name"),
  recipientName: text("recipient_name"),
  image: text("image"),
  wrappingType: wrappingTypeEnum("wrapping_type").default("standard").notNull(),
  deliveryDate: date("delivery_date"),
  isGift: boolean("is_gift").default(true).notNull(),
})

// ============================================================
// AVANCÉ
// ============================================================

export const review = pgTable(
  "review",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    productId: text("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    rating: integer("rating").notNull(),
    comment: text("comment"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("review_productId_idx").on(table.productId),
    index("review_userId_idx").on(table.userId),
  ]
)

export const giftCard = pgTable(
  "gift_card",
  {
    id: text("id").primaryKey(),
    code: text("code").notNull().unique(),
    initialBalance: decimal("initial_balance", {
      precision: 10,
      scale: 2,
    }).notNull(),
    currentBalance: decimal("current_balance", {
      precision: 10,
      scale: 2,
    }).notNull(),
    purchasedById: text("purchased_by_id").references(() => user.id),
    redeemedById: text("redeemed_by_id").references(() => user.id),
    expiresAt: timestamp("expires_at").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("giftCard_code_idx").on(table.code)]
)

export const bundle = pgTable("bundle", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  regularPrice: decimal("regular_price", {
    precision: 10,
    scale: 2,
  }).notNull(),
  bundlePrice: decimal("bundle_price", { precision: 10, scale: 2 }).notNull(),
  image: text("image"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const bundleProduct = pgTable(
  "bundle_product",
  {
    bundleId: text("bundle_id")
      .notNull()
      .references(() => bundle.id, { onDelete: "cascade" }),
    productId: text("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    quantity: integer("quantity").default(1).notNull(),
  },
  (table) => [index("bundleProduct_bundleId_idx").on(table.bundleId)]
)

export const wishlist = pgTable("wishlist", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const wishlistItem = pgTable(
  "wishlist_item",
  {
    id: text("id").primaryKey(),
    wishlistId: text("wishlist_id")
      .notNull()
      .references(() => wishlist.id, { onDelete: "cascade" }),
    productId: text("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("wishlistItem_wishlistId_idx").on(table.wishlistId)]
)

// ============================================================
// RELATIONS
// ============================================================

export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  accounts: many(account),
  orders: many(order),
  reviews: many(review),
  shippingAddresses: many(shippingAddress),
  wishlist: one(wishlist),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}))

export const occasionRelations = relations(occasion, ({ many }) => ({
  productOccasions: many(productOccasion),
}))

export const categoryRelations = relations(category, ({ many, one }) => ({
  productCategories: many(productCategory),
  parent: one(category, {
    fields: [category.parentId],
    references: [category.id],
    relationName: "categoryParent",
  }),
  children: many(category, { relationName: "categoryParent" }),
}))

export const productRelations = relations(product, ({ many }) => ({
  images: many(productImage),
  productOccasions: many(productOccasion),
  productCategories: many(productCategory),
  reviews: many(review),
  orderItems: many(orderItem),
  bundleProducts: many(bundleProduct),
  wishlistItems: many(wishlistItem),
}))

export const productImageRelations = relations(productImage, ({ one }) => ({
  product: one(product, {
    fields: [productImage.productId],
    references: [product.id],
  }),
}))

export const productOccasionRelations = relations(
  productOccasion,
  ({ one }) => ({
    product: one(product, {
      fields: [productOccasion.productId],
      references: [product.id],
    }),
    occasion: one(occasion, {
      fields: [productOccasion.occasionId],
      references: [occasion.id],
    }),
  })
)

export const productCategoryRelations = relations(
  productCategory,
  ({ one }) => ({
    product: one(product, {
      fields: [productCategory.productId],
      references: [product.id],
    }),
    category: one(category, {
      fields: [productCategory.categoryId],
      references: [category.id],
    }),
  })
)

export const shippingAddressRelations = relations(
  shippingAddress,
  ({ one }) => ({
    user: one(user, {
      fields: [shippingAddress.userId],
      references: [user.id],
    }),
  })
)

export const orderRelations = relations(order, ({ one, many }) => ({
  user: one(user, {
    fields: [order.userId],
    references: [user.id],
  }),
  shippingAddress: one(shippingAddress, {
    fields: [order.shippingAddressId],
    references: [shippingAddress.id],
  }),
  items: many(orderItem),
}))

export const orderItemRelations = relations(orderItem, ({ one }) => ({
  order: one(order, {
    fields: [orderItem.orderId],
    references: [order.id],
  }),
  product: one(product, {
    fields: [orderItem.productId],
    references: [product.id],
  }),
  giftCustomization: one(giftCustomization),
}))

export const giftCustomizationRelations = relations(
  giftCustomization,
  ({ one }) => ({
    orderItem: one(orderItem, {
      fields: [giftCustomization.orderItemId],
      references: [orderItem.id],
    }),
  })
)

export const reviewRelations = relations(review, ({ one }) => ({
  user: one(user, {
    fields: [review.userId],
    references: [user.id],
  }),
  product: one(product, {
    fields: [review.productId],
    references: [product.id],
  }),
}))

export const giftCardRelations = relations(giftCard, ({ one }) => ({
  purchasedBy: one(user, {
    fields: [giftCard.purchasedById],
    references: [user.id],
    relationName: "purchasedGiftCards",
  }),
  redeemedBy: one(user, {
    fields: [giftCard.redeemedById],
    references: [user.id],
    relationName: "redeemedGiftCards",
  }),
}))

export const bundleRelations = relations(bundle, ({ many }) => ({
  bundleProducts: many(bundleProduct),
}))

export const bundleProductRelations = relations(bundleProduct, ({ one }) => ({
  bundle: one(bundle, {
    fields: [bundleProduct.bundleId],
    references: [bundle.id],
  }),
  product: one(product, {
    fields: [bundleProduct.productId],
    references: [product.id],
  }),
}))

export const wishlistRelations = relations(wishlist, ({ one, many }) => ({
  user: one(user, {
    fields: [wishlist.userId],
    references: [user.id],
  }),
  items: many(wishlistItem),
}))

export const wishlistItemRelations = relations(wishlistItem, ({ one }) => ({
  wishlist: one(wishlist, {
    fields: [wishlistItem.wishlistId],
    references: [wishlist.id],
  }),
  product: one(product, {
    fields: [wishlistItem.productId],
    references: [product.id],
  }),
}))
