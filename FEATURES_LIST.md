# 🚀 eJobsIT - সম্পূর্ণ Feature List
### Premium Learning Management & Digital Marketplace Platform

**প্রজেক্ট নাম:** eJobsIT LMS  
**শেষ আপডেট:** January 2026  
**ভার্সন:** 1.0.0

---

# 📁 BACKEND API MODULES (23টি)

| # | Module | API Endpoint | বিবরণ |
|---|--------|--------------|-------|
| 1 | Auth | `/api/auth` | Login, Register, Password Reset |
| 2 | User | `/api/users` | User CRUD Operations |
| 3 | Category | `/api/categories` | Category Management (Parent-Child) |
| 4 | Platform | `/api/platforms` | Platform Management |
| 5 | Website | `/api/websites` | Website Templates CRUD |
| 6 | Software | `/api/software` | Software/Scripts CRUD |
| 7 | Course | `/api/courses` | Course Management |
| 8 | Module | `/api/modules` | Course Module Management |
| 9 | Lesson | `/api/lessons` | Lesson Management |
| 10 | Enrollment | `/api/enrollments` | Student Enrollment |
| 11 | Cart | `/api/cart` | Shopping Cart |
| 12 | Wishlist | `/api/wishlist` | Favorites/Wishlist |
| 13 | Order | `/api/orders` | Order Management |
| 14 | Review | `/api/reviews` | Reviews & Ratings |
| 15 | Download | `/api/downloads` | Digital Downloads |
| 16 | bKash | `/api/bkash` | bKash Payment Gateway |
| 17 | Analytics | `/api/analytics` | Dashboard Analytics |
| 18 | Upload | `/api/upload` | File Upload (Cloudinary) |
| 19 | Notification | `/api/notifications` | Real-time Notifications |
| 20 | Design | `/api/design` | Dynamic Content Management |
| 21 | Stats | `/api/stats` | Real-time Statistics |
| 22 | Coupon | `/api/coupons` | Discount Coupon System |
| 23 | Email | (Internal) | Email Service (Nodemailer) |

---

# 🌐 FRONTEND PAGES (84টি)

## 🔐 Authentication Pages (2টি)

| Page | Path | Features |
|------|------|----------|
| Login | `/login` | Email/Password Login, Remember Me |
| Register | `/register` | Full Registration Form, Password Strength |

---

## 🏠 Public Pages (13টি)

| # | Page | Path | Features |
|---|------|------|----------|
| 1 | Homepage | `/` | Hero Section, Featured Courses, Stats, Categories |
| 2 | About Us | `/about` | Company Info, Mission, Features, Team |
| 3 | Contact Us | `/contact` | Contact Form, Map, WhatsApp, Social Links |
| 4 | All Courses | `/courses` | Course Listing, Search, Filter |
| 5 | Course Details | `/courses/[slug]` | Full Course Info, Curriculum, Enroll |
| 6 | Software | `/software` | Software Listing |
| 7 | Software Details | `/software/[id]` | Software Details, Purchase |
| 8 | Website Templates | `/website` | Template Listing |
| 9 | Website Details | `/website/[id]` | Template Details, Demo, Purchase |
| 10 | Cart | `/cart` | Shopping Cart, Quantity, Remove |
| 11 | Checkout | `/checkout` | Billing, Payment, Coupon Apply |
| 12 | Mentors | `/mentors` | All Instructors |
| 13 | Certification | `/certification` | Certificate Verification |
| 14 | Events | `/events` | Events Page |
| 15 | Success Story | `/success-story` | Student Success Stories |
| 16 | Language Program | `/language-program` | Language Courses |

---

## 👨‍💼 ADMIN DASHBOARD (24টি Pages)

### 📊 Dashboard & Analytics

| Page | Path | Features |
|------|------|----------|
| **Main Dashboard** | `/dashboard/admin` | Real-time Stats, Charts, Recent Activities, Revenue |
| **Analytics** | `/dashboard/admin/analytics` | Charts, Trends, Revenue Analysis, User Growth |
| **Reports** | `/dashboard/admin/reports` | Daily/Monthly/Yearly Reports, PDF Export |

### 📚 LMS Management

| Page | Path | Features |
|------|------|----------|
| All Courses | `/dashboard/admin/course` | Course List, Search, Filter |
| Create Course | `/dashboard/admin/course/create` | Full Course Creation Form |
| Edit Course | `/dashboard/admin/course/edit/[id]` | Edit Course Details |
| Course Modules | `/dashboard/admin/course/modules/[id]` | Module Management |
| All Modules | `/dashboard/admin/module` | Module List |
| Create Module | `/dashboard/admin/module/create` | Create New Module |
| Edit Module | `/dashboard/admin/module/edit/[id]` | Edit Module |
| All Lessons | `/dashboard/admin/lesson` | Lesson List |
| Create Lesson | `/dashboard/admin/lesson/create` | Create Lesson (Video/Text/Quiz) |
| Edit Lesson | `/dashboard/admin/lesson/edit/[id]` | Edit Lesson |
| Enrollments | `/dashboard/admin/enrollment` | All Enrollments, Status |

### 🛒 Marketplace Management

| Page | Path | Features |
|------|------|----------|
| All Websites | `/dashboard/admin/website` | Website Template List |
| Create Website | `/dashboard/admin/website/create` | Add New Template |
| Edit Website | `/dashboard/admin/website/edit/[id]` | Edit Template |
| All Software | `/dashboard/admin/software` | Software List |
| Create Software | `/dashboard/admin/software/create` | Add New Software |
| Edit Software | `/dashboard/admin/software/edit/[id]` | Edit Software |

### 📁 Category Management

| Page | Path | Features |
|------|------|----------|
| All Categories | `/dashboard/admin/category` | Category List (Parent-Child View) |
| Create Category | `/dashboard/admin/category/create` | Add Category/Subcategory |

### 👥 User Management

| Page | Path | Features |
|------|------|----------|
| All Users | `/dashboard/admin/user` | User List, Roles, Status |
| Create User | `/dashboard/admin/user/create` | Add New User |

### 👨‍🏫 Mentor Management

| Page | Path | Features |
|------|------|----------|
| All Mentors | `/dashboard/admin/mentor` | Mentor List |
| Create Mentor | `/dashboard/admin/mentor/create` | Add Mentor |
| Edit Mentor | `/dashboard/admin/mentor/edit/[id]` | Edit Mentor |

### 📦 Orders & Coupons

| Page | Path | Features |
|------|------|----------|
| **Orders** | `/dashboard/admin/orders` | All Orders, Status, Payment |
| **Coupons** | `/dashboard/admin/coupons` | Create/Edit/Delete Coupons |

### ⭐ Reviews & Ratings

| Page | Path | Features |
|------|------|----------|
| Reviews | `/dashboard/admin/reviews` | All Reviews, Approve/Reject |
| Favorites & Ratings | `/dashboard/admin/favorites-ratings` | Rating Statistics |

### 🔔 Notifications

| Page | Path | Features |
|------|------|----------|
| **Notifications** | `/dashboard/admin/notifications` | All Notifications, Mark Read |

### 🎨 Design Management

| Page | Path | Features |
|------|------|----------|
| **Hero Section** | `/dashboard/admin/design/hero` | Edit Homepage Hero (EN/BN) |
| **Contact Page** | `/dashboard/admin/design/contact` | Edit Contact Page Content |

### ⚙️ Settings & Others

| Page | Path | Features |
|------|------|----------|
| Settings | `/dashboard/admin/settings` | System Settings |
| Downloads | `/dashboard/admin/downloads` | Download Management |
| Image Upload | `/dashboard/admin/image` | Image Management |
| Certification | `/dashboard/admin/certification` | Certificate Settings |
| Feedback | `/dashboard/admin/feedback` | User Feedback |

---

## 👨‍🏫 MENTOR DASHBOARD (13টি Pages)

| # | Page | Path | Features |
|---|------|------|----------|
| 1 | Dashboard | `/dashboard/mentor` | Mentor Overview, Stats |
| 2 | My Courses | `/dashboard/mentor/course` | Assigned Courses |
| 3 | Edit Course | `/dashboard/mentor/course/edit/[id]` | Edit Course |
| 4 | All Courses | `/dashboard/mentor/courses` | Course List |
| 5 | Mentors | `/dashboard/mentor/mentors` | Other Mentors |
| 6 | Edit Profile | `/dashboard/mentor/mentors/edit/[id]` | Profile Edit |
| 7 | Messages | `/dashboard/mentor/messages` | Student Messages |
| 8 | Performance | `/dashboard/mentor/performance` | Performance Analytics |
| 9 | Students | `/dashboard/mentor/students` | My Students |
| 10 | Earnings | `/dashboard/mentor/earnings` | Revenue Report |
| 11 | Settings | `/dashboard/mentor/settings` | Account Settings |
| 12 | Quizzes | `/dashboard/mentor/quizzes` | Quiz Management |
| 13 | Categories | `/dashboard/mentor/category` | Category View |

---

## 👨‍🎓 STUDENT DASHBOARD (15টি Pages)

| # | Page | Path | Features |
|---|------|------|----------|
| 1 | **Dashboard** | `/dashboard/user` | Overview, Stats, Progress |
| 2 | **My Courses** | `/dashboard/user/courses` | Enrolled Courses |
| 3 | **Course Details** | `/dashboard/user/courses/[id]` | Course Learning Page |
| 4 | Assignments | `/dashboard/user/assignments` | Assignment Submissions |
| 5 | **Certificates** | `/dashboard/user/certificates` | Earned Certificates |
| 6 | **Downloads** | `/dashboard/user/downloads` | Purchased Downloads |
| 7 | **Favorites** | `/dashboard/user/favorites` | Wishlist Items |
| 8 | **Payments** | `/dashboard/user/payments` | Payment History |
| 9 | Points | `/dashboard/user/points` | Reward Points |
| 10 | **Profile** | `/dashboard/user/profile` | Profile Settings |
| 11 | **Purchases** | `/dashboard/user/purchases` | Purchase History |
| 12 | **Reviews** | `/dashboard/user/reviews` | My Reviews |
| 13 | Schedule | `/dashboard/user/schedule` | Learning Schedule |
| 14 | **Support** | `/dashboard/user/support` | Support Tickets |
| 15 | Assets | `/dashboard/user/assets` | Digital Assets |

---

# 🧩 COMPONENTS (57টি)

## 🏠 Homepage Components

| Component | File | Features |
|-----------|------|----------|
| Hero | `Home/Hero.jsx` | Animated Hero with Typing Effect |
| PopularCourse | `Home/PopularCourse.jsx` | Featured Courses Slider |
| HomeCategory | `Home/HomeCategory.jsx` | Category Showcase |
| WhatWeProvide | `Home/WhatWeProvide.jsx` | Services Section |
| DigitalProducts | `Home/DigitalProducts.jsx` | Products Showcase |

## 📖 About Page Components

| Component | File | Features |
|-----------|------|----------|
| AboutHero | `Aboutpage/AboutHero.jsx` | About Hero Section |
| AboutMission | `Aboutpage/AboutMission.jsx` | Mission & Vision |
| AboutFeatures | `Aboutpage/AboutFeatures.jsx` | Features List |
| AboutStats | `Aboutpage/AboutStats.jsx` | Statistics Counter |
| AboutFounder | `Aboutpage/AboutFounder.jsx` | Founder Info |
| AboutGlobal | `Aboutpage/AboutGlobal.jsx` | Global Reach |
| AboutCTA | `Aboutpage/AboutCTA.jsx` | Call to Action |
| GlobeBackground | `Aboutpage/GlobeBackground.jsx` | Animated Globe |

## 🔔 Admin Components

| Component | File | Features |
|-----------|------|----------|
| **AdminSidebar** | `Admin/AdminSidebar.jsx` | Dashboard Navigation |
| **DashboardHeader** | `Admin/DashboardHeader.jsx` | Top Header with Search |
| **NotificationDropdown** | `Admin/NotificationDropdown.jsx` | Real-time Notifications Bell |
| DocumentManager | `Admin/lesson/DocumentManager.jsx` | Document Upload |
| QuestionBuilder | `Admin/lesson/QuestionBuilder.jsx` | Quiz Question Creator |
| TextContentManager | `Admin/lesson/TextContentManager.jsx` | Rich Text Editor |

## 🎓 Course Components

| Component | File | Features |
|-----------|------|----------|
| CourseCard | `coursepage/CourseCard.jsx` | Course Display Card |
| LeftCategory | `coursepage/LeftCategory.jsx` | Category Filter |
| RightCoursesDetails | `coursepage/RightCoursesDetalis.jsx` | Course Details |

## 📚 Learning Components

| Component | File | Features |
|-----------|------|----------|
| LessonDocuments | `learn/LessonDocuments.jsx` | Document Viewer |
| LessonQuiz | `learn/LessonQuiz.jsx` | Quiz Component |
| LessonTextContent | `learn/LessonTextContent.jsx` | Text Lesson Viewer |

## 📦 Shared Components

| Component | File | Features |
|-----------|------|----------|
| **Navbar** | `sheard/Navbar.jsx` | Main Navigation with Mega Menu |
| **Footer** | `sheard/Footer.jsx` | Site Footer |
| **TopHeader** | `sheard/TopHeader.jsx` | Announcement Bar |
| CourseCard | `sheard/CourseCard.jsx` | Course Card UI |
| ProductCard | `sheard/ProductCard.jsx` | Product Card UI |
| **LanguageSwitcher** | `sheard/LanguageSwitcher.jsx` | EN/BN Toggle |
| **ScrollToTop** | `sheard/ScrollToTop.jsx` | Scroll Button |
| **WhatsAppButton** | `sheard/WhatsAppButton.jsx` | WhatsApp Floating |
| FloatingLanguageButton | `sheard/FloatingLanguageButton.jsx` | Language Selector |
| FloatingSeminarButton | `sheard/FloatingSeminarButton.jsx` | Seminar CTA |
| ButtonPrimary | `sheard/ButtonPrimary.jsx` | Primary Button |
| SectionHeading | `sheard/SectionHeading.jsx` | Section Title |

## 🎨 UI Components

| Component | File | Features |
|-----------|------|----------|
| BlizzardBackground | `ui/BlizzardBackground.jsx` | Animated Background |
| (5 more UI components) | `ui/` | Various UI Elements |

---

# ✨ SPECIAL FEATURES

## 🔔 1. Real-time Notification System

```
✅ Order Notifications (New Order Placed)
✅ Enrollment Notifications (New Student Enrolled)
✅ Review Notifications (New Review Added)
✅ User Registration Notifications
✅ Bell Icon with Unread Count Badge
✅ Mark as Read / Mark All as Read
✅ Click to Navigate to Details
✅ Auto-refresh Every 30 Seconds
```

## 📧 2. Email Notification System

```
✅ Welcome Email (On Registration)
   - Beautiful HTML Template
   - Personalized with User Name
   
✅ Purchase Invoice Email (On Order)
   - Order Details
   - Item List with Prices
   - Total Amount
   - Transaction ID
   - Download Links
   
✅ Password Reset Email
   - Secure Reset Link
   - Token-based Security
   - 1 Hour Expiry
```

## 📊 3. Analytics & Reports System

### Admin Analytics (`/dashboard/admin/analytics`)
```
✅ Total Revenue (with Trend %)
✅ Total Users (with Growth %)
✅ Total Orders (with Trend %)
✅ Total Courses
✅ Total Enrollments
✅ Revenue Chart (Area Chart)
✅ Order Trends Chart
✅ Top Selling Products
✅ Recent Activities
✅ Animated Counters
```

### Reports Page (`/dashboard/admin/reports`)
```
✅ Daily Reports
✅ Weekly Reports
✅ Monthly Reports
✅ Yearly Reports
✅ PDF Export (jsPDF)
   - Styled PDF with Logo
   - Tables with Data
   - Summary Section
✅ Report Types:
   - User Report
   - Order Report
   - Revenue Report
   - Course Report
   - Enrollment Report
```

## 🎟️ 4. Coupon/Discount System

```
✅ Create Unlimited Coupons
✅ Discount Types:
   - Percentage (e.g., 20% OFF)
   - Fixed Amount (e.g., ৳500 OFF)
✅ Validation Rules:
   - Minimum Purchase Amount
   - Maximum Discount Limit
   - Start Date & End Date
   - Total Usage Limit
   - Per User Usage Limit
✅ Product Type Specific:
   - All Products
   - Courses Only
   - Websites Only
   - Software Only
✅ Auto-Generate Coupon Code
✅ Apply at Checkout
✅ Real-time Discount Calculation
✅ Usage Tracking
```

## 🎨 5. Dynamic Content Management

### Hero Section Designer
```
✅ Badge Text (EN/BN)
✅ Heading Line 1 & 2 (EN/BN)
✅ Dynamic Typing Texts (EN/BN)
✅ Description (EN/BN)
✅ Features List (EN/BN)
✅ Search Placeholder (EN/BN)
✅ Statistics (Users, Downloads, Rating, Products)
```

### Contact Page Designer
```
✅ Hero Section (Badge, Title, Subtitle)
✅ Contact Info (Email, Phone, Address)
✅ Office Hours
✅ Social Media Links (Facebook, YouTube, LinkedIn, WhatsApp, Instagram)
✅ WhatsApp Quick Help Section
✅ Google Maps Embed URL
✅ All with EN/BN Support
```

## 🌐 6. Multi-language Support

```
✅ English (EN)
✅ Bengali (BN) - বাংলা
✅ Hind Siliguri Font for Bengali
✅ Language Switcher in:
   - Navbar (Desktop)
   - Mobile Menu
   - Floating Button
✅ Translation Files:
   - /locales/en.json
   - /locales/bn.json
✅ useLanguage Context Hook
✅ Persistent Language Preference
```

## 🌙 7. Dark/Light Mode

```
✅ Light Theme (Default)
✅ Dark Theme
✅ Toggle in Navbar
✅ Toggle in Mobile Menu
✅ Persistent Theme (localStorage)
✅ System Theme Detection
✅ Smooth Transition Animation
```

## 📱 8. Responsive Design

```
✅ Mobile First Approach
✅ Tablet Optimized
✅ Desktop Full Experience
✅ Breakpoints:
   - sm: 640px
   - md: 768px
   - lg: 1024px
   - xl: 1280px
   - 2xl: 1536px
✅ Touch-friendly Interface
✅ Mobile Hamburger Menu
✅ Responsive Tables
✅ Responsive Cards
```

## 💳 9. bKash Payment Integration

```
✅ Create Payment
✅ Execute Payment
✅ Query Payment Status
✅ Refund Support
✅ Sandbox/Production Mode
✅ Transaction Logging
✅ Payment Verification
```

## 🔒 10. Security Features

```
✅ JWT Token Authentication
✅ Refresh Token Support
✅ Password Hashing (bcrypt)
✅ Role-based Access Control:
   - Admin
   - Mentor
   - Student
✅ Protected Routes
✅ Input Validation (Zod)
✅ CORS Protection
✅ Rate Limiting
✅ Secure Headers
```

## 📁 11. File Management

```
✅ Cloudinary Integration
✅ Image Upload (JPG, PNG, WebP)
✅ Document Upload (PDF, DOC)
✅ Video Hosting:
   - YouTube Embed
   - Vimeo Embed
   - Direct Upload
✅ File Size Validation
✅ Format Validation
```

## 🎓 12. LMS Features

```
✅ Course Creation:
   - Title, Description, Thumbnail
   - Pricing (Free/Paid)
   - Duration, Difficulty Level
   - Learning Outcomes
   - Requirements
   
✅ Module System:
   - Multiple Modules per Course
   - Module Ordering
   - Module Status
   
✅ Lesson Types:
   - Video Lessons (YouTube/Vimeo)
   - Text Lessons (Rich Text)
   - Quiz Lessons (MCQ)
   - Document Lessons (PDF)
   
✅ Quiz System:
   - Multiple Choice Questions
   - Correct Answer Validation
   - Score Calculation
   - Pass/Fail Criteria
   
✅ Progress Tracking:
   - Lesson Completion
   - Module Progress
   - Course Progress
   - Resume from Last Point
   
✅ Certificate Generation:
   - Auto-generate on Completion
   - PDF Certificate
   - Verification System
```

## 🛒 13. E-commerce Features

```
✅ Product Types:
   - Courses
   - Website Templates
   - Software/Scripts
   
✅ Shopping Cart:
   - Add to Cart
   - Remove from Cart
   - Quantity Update
   - Cart Persistence
   
✅ Wishlist:
   - Add to Favorites
   - Remove from Favorites
   - Move to Cart
   
✅ Checkout:
   - Billing Information
   - Coupon Application
   - Payment Selection
   - Order Confirmation
   
✅ Orders:
   - Order History
   - Order Status Tracking
   - Order Details
   - Digital Downloads
   
✅ Reviews & Ratings:
   - Product Reviews
   - Star Ratings
   - Review Moderation
```

## 🎯 14. Navigation Features

```
✅ Sticky Navbar
✅ Category Mega Menu:
   - Parent Categories (Left)
   - Child Categories (Right)
   - Hover Navigation
   - API Integrated
✅ Mobile Hamburger Menu
✅ Scroll to Top Button
✅ Breadcrumb Navigation
✅ Active Link Highlight
```

## ✨ 15. Animations & UX

```
✅ Framer Motion Animations
✅ Page Transitions
✅ Scroll Animations
✅ Hover Effects
✅ Loading Spinners
✅ Skeleton Loaders
✅ Toast Notifications
✅ Modal Animations
✅ Typing Effect (Hero)
✅ Counter Animations
✅ Card Hover Effects
```

---

# 🔧 TECHNICAL STACK

## Frontend
```
⚛️  Next.js 14 (App Router)
🎨  Tailwind CSS
🔄  Redux Toolkit (State Management)
🎭  Framer Motion (Animations)
📝  React Hook Form
🔔  React Hot Toast
📊  Recharts (Charts)
📄  jsPDF (PDF Generation)
🌐  i18n (Multi-language)
```

## Backend
```
🟢  Node.js + Express.js
🍃  MongoDB + Mongoose
🔐  JWT Authentication
✅  Zod Validation
📧  Nodemailer
☁️  Cloudinary
💳  bKash SDK
```

## Deployment
```
▲  Vercel (Frontend & Backend)
🌐  Custom Domain Support
🔒  SSL Certificate
📊  Vercel Analytics
```

---

# 📊 PROJECT STATISTICS

| Category | Count |
|----------|-------|
| Total Backend Modules | 23 |
| Total Frontend Pages | 84 |
| Total Components | 57 |
| Admin Dashboard Pages | 24 |
| Mentor Dashboard Pages | 13 |
| Student Dashboard Pages | 15 |
| Public Pages | 16 |
| API Endpoints | 100+ |
| Translation Files | 2 (EN/BN) |

---

# 🎯 PERFECT FOR

✅ Online Learning Platforms  
✅ IT Training Institutes  
✅ Digital Product Marketplaces  
✅ Course Selling Websites  
✅ Template/Theme Marketplaces  
✅ Software Distribution Platforms  
✅ EdTech Startups  

---

**Developed with ❤️ for eJobsIT**

*Document Generated: January 2026*
