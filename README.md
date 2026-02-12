# 🎯 Decision Sandbox - Frontend

## ✨ Tính năng mới

### 🎨 Thiết kế
- **Modern Futuristic Theme**: Background gradient động với hiệu ứng ánh sáng
- **Typography**: Sử dụng Outfit (display) và Space Mono (monospace) cho vẻ hiện đại
- **Color Palette**: Deep space theme với blue/purple accents
- **Glassmorphism**: Cards với backdrop-blur và semi-transparent backgrounds

### ⚡ Animations
- **Page Entry**: Smooth fade-in và slide-up khi load trang
- **Card Animations**: Staggered reveals với animation delays
- **Hover Effects**: Transforms, shadows, và color transitions
- **Loading States**: Spinning loader và shimmer effects
- **Interactive Feedback**: Ripple effects, scale transforms khi click
- **Timeline**: Progressive reveal với staggered animation
- **Smooth Transitions**: Fade out trước khi chuyển steps

### 📱 Responsive Design
- **Mobile-first**: Hoàn toàn responsive từ 320px đến desktop
- **Breakpoints**: Tối ưu cho mobile, tablet, và desktop
- **Touch-friendly**: Buttons và interactive elements đủ lớn cho mobile

### 🎭 UX Improvements
- **Visual Feedback**: 
  - Buttons disabled khi chưa đủ điều kiện
  - Active states cho selections
  - Loading indicators rõ ràng
  - Error states đẹp mắt

- **Progressive Disclosure**:
  - Từng step xuất hiện tuần tự
  - Smooth transitions giữa các bước
  - Clear visual hierarchy

- **Micro-interactions**:
  - Ripple effect khi click
  - Hover states cho tất cả interactive elements
  - Glow effects khi hoàn thành questions
  - Scale animations khi click buttons

## 📁 Cấu trúc Files

```
├── index.html                 # Main HTML file
├── style.css                  # All styles with animations
├── main.js                    # App orchestrator
└── components/
    ├── inputForm.js          # Step 1: Intent input
    ├── socraticForm.js       # Step 2: Socratic questions
    ├── realityShift.js       # Step 3: Reality mode selection
    ├── timelineView.js       # Results: Timeline display
    ├── resultView.js         # Results: Full simulation output
    └── resultCard.js         # Helper: Card component
```

## 🚀 Cách sử dụng

1. **Upload tất cả files** vào project của bạn
2. **Đảm bảo cấu trúc thư mục** giống như trên
3. **Backend phải chạy** tại `http://localhost:3000/api/simulate`
4. **Mở index.html** trong browser hoặc chạy với live server

## 🎯 User Flow

1. **Intent Input** → User nhập decision/intent
2. **Socratic Questions** → 3 câu hỏi về mindset (phải trả lời đủ 3 câu)
3. **Reality Mode** → Chọn 1 trong 3 modes: Start Now / Delay / Safe
4. **Loading** → Hiển thị loading state đẹp
5. **Results** → Timeline + Risk Analysis + Outcomes + Reflections

## 🎨 Customization

### Màu sắc
Tất cả colors được định nghĩa trong CSS variables ở đầu `style.css`:
```css
:root {
  --color-accent-primary: #3b82f6;
  --color-accent-secondary: #8b5cf6;
  /* ... */
}
```

### Fonts
Đang sử dụng Google Fonts:
- **Outfit**: Display font (headings, body)
- **Space Mono**: Monospace (code, numbers)

Có thể thay đổi trong `style.css` dòng 1.

### Animations
Tất cả animations có thể tùy chỉnh timing trong CSS variables:
```css
--transition-fast: 0.15s ease;
--transition-base: 0.25s ease;
--transition-slow: 0.4s ease;
```

## 🔧 Backend API Format

Backend cần trả về JSON với format:
```json
{
  "timeline": [
    { "time": "Week 1", "label": "Initial setup..." },
    { "time": "Month 1", "label": "First milestone..." }
  ],
  "difficulty": "Medium",
  "duration": "2-3 months",
  "risks": [
    { "name": "Time management", "level": "HIGH" },
    { "name": "Resource allocation", "level": "MEDIUM" }
  ],
  "outcomes": [
    { "title": "Best Case", "summary": "Everything works..." },
    { "title": "Realistic", "summary": "Normal progress..." }
  ],
  "questions": [
    "Are you avoiding this because of fear or lack of clarity?",
    "What would happen if you started tomorrow?"
  ]
}
```

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎉 Features Highlights

1. **Emojis**: Mỗi section có emoji phù hợp
2. **Color-coded Risk Levels**: HIGH (red), MEDIUM (orange), LOW (green)
3. **Gradient Markers**: Timeline markers với gradient khác nhau
4. **Progress Indicators**: Counter cho socratic questions
5. **Accessibility**: Reduced motion support
6. **Performance**: CSS-only animations (không dùng JS cho animations)

## 💡 Tips

- **Prefers Reduced Motion**: Tự động giảm animations cho users có accessibility needs
- **Loading States**: Luôn show feedback khi đang xử lý
- **Error Handling**: Error states được design đẹp và rõ ràng
- **Mobile**: Test kỹ trên mobile vì animations có thể lag trên low-end devices

## 🐛 Known Issues / Notes

- Cần backend chạy ở `localhost:3000`
- Nếu muốn đổi backend URL, sửa trong `main.js` line 20
- Animations delay có thể cần adjust tùy data size

## 📞 Support

Nếu có vấn đề gì, check:
1. Console log có errors không
2. Backend API có trả về đúng format không
3. Tất cả files có trong đúng thư mục không

---

Made with ❤️ for Decision Sandbox