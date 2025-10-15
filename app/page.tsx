<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đẹp+</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #fdfaf6; 
        }
        h1 {
            font-family: 'Playfair Display', serif;
        }
        .upload-box {
            border: 2px dashed #d1d5db;
            transition: all 0.3s ease-in-out;
        }
        .upload-box:hover, .upload-box.dragover {
            background-color: #f0faf9; 
            border-color: #069668; 
        }
        .upload-box img {
            object-fit: cover;
        }
        .loader {
            border-top-color: #065f46;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
        .loading-active {
            animation: pulse-bg 2.5s infinite ease-in-out;
        }
        @keyframes pulse-bg {
            0%, 100% {
                background-color: #f3f4f6;
                border-color: #d1d5db;
            }
            50% {
                background-color: #e5e7eb;
                border-color: #9ca3af;
            }
        }
        .btn-primary {
            background-color: #065f46;
            transition: all 0.3s ease-in-out;
            transform: translateY(0);
        }
        .btn-primary:hover:not(:disabled) {
            background-color: #047857;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
        }
        .btn-primary:disabled {
            background-color: #6ee7b7;
            cursor: not-allowed;
        }
        .fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .modal-fade-in {
            animation: modalFadeIn 0.3s ease-out;
        }
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        #camera-stream {
            transform: scaleX(-1);
        }
        .context-btn.active {
            background-color: #ffffff;
            color: #065f46;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body class="text-gray-800 antialiased">
    <div id="app" class="container mx-auto p-4 md:p-8 max-w-7xl">
        <header class="text-center mb-10 md:mb-14">
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">Đẹp+</h1>
            <p class="text-base sm:text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Biến tầm nhìn của bạn thành hiện thực. Tạo ra những hình ảnh phong cách sống ngoạn mục, chân thực như ảnh chụp với sức mạnh của AI.</p>
            <p class="text-sm text-gray-500 mt-2">www.taoanh.vn</p>
        </header>

        <div class="mb-8 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <button id="toggle-guide-btn" class="flex justify-between items-center w-full text-left font-semibold text-emerald-800 text-md md:text-lg">
                <span>Hướng dẫn sử dụng để có ảnh đẹp nhất</span>
                <svg id="guide-arrow" class="w-5 h-5 transition-transform transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div id="guide-content" class="hidden mt-4 text-gray-700 space-y-2 prose prose-sm max-w-none">
                <p>Để AI tạo ra hình ảnh đẹp và giống bạn nhất, hãy làm theo các bước sau:</p>
                <ul class="list-decimal list-inside space-y-2 pl-4">
                    <li><strong>Cung cấp ảnh gương mặt chất lượng cao:</strong>
                        <ul class="list-disc list-inside pl-6">
                            <li><strong>Ảnh chính diện:</strong> Rõ nét, không bị che khuất, nhìn thẳng vào máy ảnh. Đây là ảnh quan trọng nhất!</li>
                            <li><strong>Ảnh góc nghiêng (Tùy chọn):</strong> Cung cấp thêm ảnh nghiêng trái/phải giúp AI hiểu rõ hơn về cấu trúc khuôn mặt của bạn.</li>
                            <li><strong>Ánh sáng tốt:</strong> Tránh ảnh quá tối, quá sáng hoặc có bóng đổ gắt trên mặt.</li>
                        </ul>
                    </li>
                    <li><strong>Chọn Bối Cảnh & Phong cách:</strong> Chọn 1 trong 3 loại: <strong>Địa điểm</strong> (để ghép bạn vào các danh lam thắng cảnh), <strong>Studio</strong> (cho các ảnh chân dung chuyên nghiệp), hoặc <strong>Bìa Tạp chí</strong> (để tạo ảnh theo phong cách editorial).</li>
                    <li><strong>Thêm chi tiết:</strong> Dùng ô "Mô Tả Bối Cảnh" hoặc nút "Gợi Ý Chi Tiết" để thêm các yêu cầu về ánh sáng, cảm xúc, góc máy... để bức ảnh thêm phần sống động.</li>
                    <li><strong>Nhấn "Tạo Ảnh" và chờ đợi kết quả!</strong></li>
                     <li><strong>Thử lại để có kết quả tốt hơn:</strong> Nếu ảnh chưa đúng ý bạn, hãy thử nhấn "Tạo Ảnh" lại một vài lần. Đôi khi AI cần "làm quen" với gương mặt của bạn để cho ra kết quả chính xác nhất.</li>
                </ul>
            </div>
        </div>

        <main class="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <!-- Left Column: Inputs -->
                <div class="flex flex-col gap-8">
                    <!-- Step 1: Uploads -->
                    <div>
                        <h2 class="text-xl md:text-2xl font-semibold mb-4 text-gray-800 flex items-center"><span class="bg-emerald-800 text-white rounded-full h-8 w-8 text-sm flex items-center justify-center font-bold mr-3">1</span>Cung Cấp Hình Ảnh</h2>
                        <div class="space-y-4">
                            <!-- Main Face Upload -->
                            <div class="flex flex-col">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Góc chính diện <span class="text-red-500">*</span></label>
                                <div id="face-front-upload-container">
                                    <div class="upload-box w-full h-48 rounded-lg flex items-center justify-center cursor-pointer relative overflow-hidden group">
                                        <input type="file" id="face-front-upload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" accept="image/*">
                                        <div id="face-front-preview-placeholder" class="w-full h-full flex flex-col items-center justify-center text-gray-500 transition-opacity duration-300 p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10 mb-2"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>
                                            <span class="text-sm text-center font-semibold">Tải Lên / Chụp Ảnh Chính Diện</span>
                                        </div>
                                        <img id="face-front-img-preview" class="hidden w-full h-full absolute inset-0" alt="Face Front Preview">
                                        <button id="face-front-remove-btn" class="absolute top-2 right-2 bg-gray-800 bg-opacity-60 text-white rounded-full p-1 hidden hover:bg-opacity-80 transition z-30 opacity-0 group-hover:opacity-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                                        </button>
                                    </div>
                                </div>
                                <button id="capture-face-front-btn" class="mt-2 w-full text-sm bg-gray-100 text-gray-700 font-semibold py-2 px-3 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                                    Chụp Ảnh
                                </button>
                            </div>

                             <!-- Toggle Button for Optional Images -->
                            <div class="mt-4">
                                <button id="toggle-optional-images-btn" class="w-full text-sm text-emerald-700 font-semibold py-2 px-3 rounded-lg hover:bg-emerald-100 transition flex items-center justify-center gap-2 border-2 border-dashed border-emerald-300">
                                    <svg id="optional-images-icon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                    </svg>
                                    <span id="optional-images-text">Thêm các góc ảnh khác & phụ kiện (tùy chọn)</span>
                                </button>
                            </div>

                            <!-- Optional Images Container -->
                            <div id="optional-images-container" class="hidden">
                                <div class="grid grid-cols-3 gap-4">
                                    <!-- Face Left Upload -->
                                    <div class="flex flex-col">
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Góc nghiêng trái</label>
                                        <div id="face-left-upload-container">
                                            <div class="upload-box w-full h-32 rounded-lg flex items-center justify-center cursor-pointer relative overflow-hidden group">
                                                <input type="file" id="face-left-upload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" accept="image/*">
                                                <div id="face-left-preview-placeholder" class="w-full h-full flex flex-col items-center justify-center text-gray-500 transition-opacity duration-300 p-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 mb-1"><circle cx="12" cy="12" r="10" /><path d="M12 18a6 6 0 0 0-6-6 6 6 0 0 0 6-6"/></svg>
                                                    <span class="text-xs text-center font-semibold">Tải Lên / Chụp</span>
                                                </div>
                                                <img id="face-left-img-preview" class="hidden w-full h-full absolute inset-0" alt="Face Left Preview">
                                                <button id="face-left-remove-btn" class="absolute top-2 right-2 bg-gray-800 bg-opacity-60 text-white rounded-full p-1 hidden hover:bg-opacity-80 transition z-30 opacity-0 group-hover:opacity-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                        <button id="capture-face-left-btn" class="mt-2 w-full text-sm bg-gray-100 text-gray-700 font-semibold py-2 px-3 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition flex items-center justify-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                                            Chụp Ảnh
                                        </button>
                                    </div>
                                    <!-- Face Right Upload -->
                                    <div class="flex flex-col">
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Góc nghiêng phải</label>
                                        <div id="face-right-upload-container">
                                            <div class="upload-box w-full h-32 rounded-lg flex items-center justify-center cursor-pointer relative overflow-hidden group">
                                                <input type="file" id="face-right-upload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" accept="image/*">
                                                <div id="face-right-preview-placeholder" class="w-full h-full flex flex-col items-center justify-center text-gray-500 transition-opacity duration-300 p-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 mb-1"><circle cx="12" cy="12" r="10"/><path d="M12 6a6 6 0 0 0 6 6 6 6 0 0 0-6 6"/></svg>
                                                    <span class="text-xs text-center font-semibold">Tải Lên / Chụp</span>
                                                </div>
                                                <img id="face-right-img-preview" class="hidden w-full h-full absolute inset-0" alt="Face Right Preview">
                                                <button id="face-right-remove-btn" class="absolute top-2 right-2 bg-gray-800 bg-opacity-60 text-white rounded-full p-1 hidden hover:bg-opacity-80 transition z-30 opacity-0 group-hover:opacity-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                        <button id="capture-face-right-btn" class="mt-2 w-full text-sm bg-gray-100 text-gray-700 font-semibold py-2 px-3 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition flex items-center justify-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                                            Chụp Ảnh
                                        </button>
                                    </div>
                                    <!-- Accessories Upload -->
                                    <div class="flex flex-col">
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Phụ kiện</label>
                                        <div id="accessories-upload-container">
                                            <div class="upload-box w-full h-32 rounded-lg flex items-center justify-center cursor-pointer relative overflow-hidden group">
                                                <input type="file" id="accessories-upload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" accept="image/*">
                                                <div id="accessories-preview-placeholder" class="w-full h-full flex flex-col items-center justify-center text-gray-500 transition-opacity duration-300 p-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 mb-1"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.12 15.88"/><path d="m14.47 14.48 5.09 5.09"/><path d="M8.12 8.12 12 12"/></svg>
                                                    <span class="text-xs text-center font-semibold">Tải Lên / Chụp</span>
                                                </div>
                                                <img id="accessories-img-preview" class="hidden w-full h-full absolute inset-0" alt="Accessories Preview">
                                                <button id="accessories-remove-btn" class="absolute top-2 right-2 bg-gray-800 bg-opacity-60 text-white rounded-full p-1 hidden hover:bg-opacity-80 transition z-30 opacity-0 group-hover:opacity-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                        <button id="capture-accessories-btn" class="mt-2 w-full text-sm bg-gray-100 text-gray-700 font-semibold py-2 px-3 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition flex items-center justify-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                                            Chụp Ảnh
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Step 2: Context Selection -->
                    <div>
                        <h2 class="text-xl md:text-2xl font-semibold mb-4 text-gray-800 flex items-center"><span class="bg-emerald-800 text-white rounded-full h-8 w-8 text-sm flex items-center justify-center font-bold mr-3">2</span>Chọn Bối Cảnh & Phong cách <span class="text-red-500 ml-1">*</span></h2>
                        <div class="flex flex-col gap-4">
                            <div>
                                <label class="block text-base sm:text-lg font-semibold text-gray-800 mb-2">Loại Bối Cảnh</label>
                                <div id="context-buttons" class="grid grid-cols-3 gap-2 rounded-lg bg-gray-200 p-1">
                                    <button data-context="location" class="context-btn w-full text-center rounded-md py-2 px-4 text-sm font-semibold text-gray-700 transition hover:bg-white hover:text-gray-900">Địa điểm</button>
                                    <button data-context="studio" class="context-btn w-full text-center rounded-md py-2 px-4 text-sm font-semibold text-gray-700 transition hover:bg-white hover:text-gray-900">Studio</button>
                                    <button data-context="magazine" class="context-btn w-full text-center rounded-md py-2 px-4 text-sm font-semibold text-gray-700 transition hover:bg-white hover:text-gray-900">Bìa Tạp chí</button>
                                </div>
                            </div>
                            
                            <div id="dynamic-options-container" class="space-y-4">
                                <!-- Magazine Options will be injected here -->
                                <!-- Location/Studio options will be injected here -->
                            </div>

                        </div>
                    </div>

                    <!-- Step 3: Character Style (for Location/Studio) -->
                    <div id="character-style-options" class="hidden">
                        <h2 class="text-xl md:text-2xl font-semibold mb-4 text-gray-800 flex items-center"><span class="bg-emerald-800 text-white rounded-full h-8 w-8 text-sm flex items-center justify-center font-bold mr-3">3</span>Phong cách Nhân vật <span class="text-gray-400 text-lg ml-2">(Không bắt buộc)</span></h2>
                        <select id="style-select" data-placeholder="-- Chọn một phong cách --" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white shadow-sm">
                            <option value="">-- Chọn một phong cách --</option>
                        </select>
                    </div>

                    <!-- Step 4: Scene Description -->
                    <div>
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-xl md:text-2xl font-semibold text-gray-800 flex items-center"><span class="bg-emerald-800 text-white rounded-full h-8 w-8 text-sm flex items-center justify-center font-bold mr-3">4</span>Mô Tả Bối Cảnh <span class="text-gray-400 text-lg ml-2">(Không bắt buộc)</span></h2>
                            <button id="suggest-details-btn" class="text-sm bg-emerald-100 text-emerald-800 font-semibold py-2 px-3 rounded-lg hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition flex items-center disabled:opacity-50">
                                <svg id="suggest-icon" xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                <span id="suggest-btn-text">Gợi Ý Chi Tiết</span>
                                <svg id="suggest-spinner" class="animate-spin ml-2 h-4 w-4 text-emerald-700 hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </button>
                        </div>
                        <textarea id="prompt-input" rows="4" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition shadow-sm" placeholder="VD: Ánh sáng giờ vàng, tạo dáng tự nhiên, cảm giác điện ảnh, độ sâu trường ảnh nông..."></textarea>
                    </div>

                    <div id="error-message" class="text-red-600 font-medium text-sm hidden bg-red-100 p-3 rounded-lg"></div>

                    <button id="generate-btn" class="w-full btn-primary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 text-lg">
                        Tạo Ảnh
                    </button>
                </div>

                <!-- Right Column: Output -->
                <div class="flex flex-col">
                     <h2 class="text-xl md:text-2xl font-semibold mb-4 text-gray-800 flex items-center"><span class="bg-emerald-800 text-white rounded-full h-8 w-8 text-sm flex items-center justify-center font-bold mr-3">5</span>Ảnh Của Bạn</h2>
                    <div id="result-container" class="w-full h-full min-h-[300px] lg:min-h-full bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed transition-colors duration-500 relative group">
                        <div id="loading-indicator" class="hidden flex-col items-center text-gray-600 text-center px-4 w-4/5 max-w-sm">
                            <div class="loader w-12 h-12 mb-4 rounded-full border-4 border-gray-200"></div>
                             <p id="loading-text" class="font-medium text-lg mb-2">Đang tạo kiệt tác của bạn...</p>
                            <div class="w-full bg-gray-200 rounded-full h-2.5">
                                <div id="progress-bar" class="bg-emerald-600 h-2.5 rounded-full transition-all duration-300 ease-linear" style="width: 0%"></div>
                            </div>
                            <p id="progress-text" class="text-sm font-semibold text-gray-500 mt-2">0%</p>
                        </div>
                        <div id="placeholder-text" class="text-gray-500 text-center p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-16 h-16 mx-auto mb-4 text-gray-300"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M20.4 14.5c0-1.6-1.3-3-3-3s-3 1.3-3 3c0 1.6 1.3 3 3 3s3-1.3 3-3Z"/><path d="m3 16 7-7a2 2 0 0 1 2.8 0l2.4 2.4c.8.8 2 .8 2.8 0L21 9"/></svg>
                            Hình ảnh của bạn sẽ xuất hiện ở đây.
                        </div>
                        <img id="result-img" class="hidden w-full h-full object-contain" alt="Generated lifestyle photo">
                        
                        <!-- Actions Overlay -->
                        <div id="image-actions" class="hidden absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button id="zoom-btn" class="bg-white text-gray-800 p-3 rounded-full shadow-md hover:bg-gray-200 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
                            </button>
                        </div>
                    </div>
                    <div id="download-container" class="hidden mt-4 flex justify-center">
                        <a id="download-btn" href="#" class="flex items-center gap-2 bg-emerald-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-emerald-700 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                            Tải Xuống
                        </a>
                    </div>
                </div>
            </div>
        </main>
        
        <!-- Templates for dynamic options -->
        <template id="location-options-template">
             <div class="space-y-4">
                <div>
                    <label for="region-select" class="block text-sm font-medium text-gray-700 mb-1">Khu vực</label>
                    <select id="region-select" data-placeholder="-- Vui lòng chọn khu vực --" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white shadow-sm">
                        <option value="">-- Vui lòng chọn khu vực --</option>
                    </select>
                </div>
                <div>
                    <label for="country-select" class="block text-sm font-medium text-gray-700 mb-1">Quốc gia</label>
                    <select id="country-select" data-placeholder="-- Chọn khu vực trước --" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white shadow-sm" disabled>
                        <option value="">-- Chọn khu vực trước --</option>
                    </select>
                </div>
                <div>
                    <label for="landmark-select" class="block text-sm font-medium text-gray-700 mb-1">Địa danh</label>
                    <select id="landmark-select" data-placeholder="-- Chọn quốc gia trước --" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white shadow-sm" disabled>
                        <option value="">-- Chọn quốc gia trước --</option>
                    </select>
                </div>
            </div>
        </template>
        <template id="studio-options-template">
             <div class="space-y-4">
                 <div>
                    <label for="studio-select" class="block text-sm font-medium text-gray-700 mb-1">Phông nền Studio</label>
                    <select id="studio-select" data-placeholder="-- Chọn phông nền --" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white shadow-sm">
                        <option value="">-- Chọn phông nền --</option>
                    </select>
                </div>
            </div>
        </template>
        <template id="magazine-options-template">
             <div class="space-y-4">
                <div>
                    <label for="magazine-style-select" class="block text-sm font-medium text-gray-700 mb-1">Phong cách Tạp chí</label>
                    <select id="magazine-style-select" data-placeholder="-- Chọn phong cách bìa --" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white shadow-sm">
                        <option value="">-- Chọn phong cách bìa --</option>
                    </select>
                </div>
                <div id="magazine-text-container" class="flex items-center">
                    <input id="magazine-text-toggle" type="checkbox" checked class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded">
                    <label for="magazine-text-toggle" class="ml-2 block text-sm text-gray-900">Hiển thị Text Bìa Tạp chí</label>
                </div>
                
                <div id="magazine-background-selector" class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Thêm Bối cảnh (Tùy chọn)</label>
                    <select id="magazine-background-type-select" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white shadow-sm">
                        <option value="">-- Không có bối cảnh --</option>
                        <option value="location">Địa điểm</option>
                        <option value="studio">Studio</option>
                    </select>
                    <div id="magazine-nested-options-container" class="mt-4 space-y-4"></div>
                </div>
            </div>
        </template>
    </div>

    <!-- Zoom Modal -->
    <div id="zoom-modal" class="hidden fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 modal-fade-in">
        <span id="close-zoom-modal-btn" class="absolute top-4 right-6 text-white text-5xl font-light cursor-pointer hover:text-gray-300 transition">&times;</span>
        <img id="zoomed-img" class="max-w-full max-h-full object-contain" src="" alt="Zoomed generated photo">
    </div>
    
    <!-- Camera Modal -->
    <div id="camera-modal" class="hidden fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 modal-fade-in">
        <div class="bg-white rounded-lg p-6 shadow-xl w-full max-w-lg relative">
             <h3 class="text-xl font-semibold text-center mb-4">Chụp Ảnh</h3>
             <video id="camera-stream" class="w-full h-auto bg-gray-200 rounded-md mb-4" autoplay playsinline></video>
             <div class="flex items-center justify-center gap-4">
                 <button id="take-photo-btn" class="w-16 h-16 bg-white rounded-full border-4 border-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"></button>
             </div>
            <button id="close-camera-modal-btn" class="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
    </div>
    
    <!-- Canvases for processing. These are not displayed. -->
    <canvas id="capture-canvas" class="hidden"></canvas>


    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const faceFrontStore = {};
            const faceLeftStore = {};
            const faceRightStore = {};
            const accessoriesStore = {};
            let progressInterval;
            let activeStream = null;
            let captureTarget = null;
            let selectedContext = null;

            const data = {
                styles: {
                    "co-dien": {
                        text: "Phong cách Cổ điển",
                        options: [
                            { text: "Phong cách Quý cô", value: "as an elegant lady with a classic and sophisticated look." },
                            { text: "Phong cách Quý bà", value: "as a sophisticated madam, exuding power and grace." },
                            { text: "Phong cách Nàng thơ", value: "as an artistic and dreamy muse." },
                            { text: "Nữ hoàng Victoria", value: "as a Victorian Queen with an ornate gown and regal posture." },
                            { text: "Nữ hoàng Ai Cập", value: "as an Egyptian Queen like Cleopatra with golden accessories." },
                            { text: "Cô dâu lộng lẫy", value: "as a gorgeous bride in a stunning wedding dress." }
                        ]
                    },
                    "hien-dai": {
                         text: "Phong cách Hiện đại",
                         options: [
                            { text: "Nữ sinh thanh lịch", value: "as an elegant female student in a stylish uniform." },
                            { text: "Nữ chiến binh", value: "as a fierce warrior princess in epic armor." },
                            { text: "Ngôi sao nhạc Rock", value: "as a rock star with a leather jacket and electric guitar." },
                            { text: "Nàng tiên cá", value: "as an ethereal mermaid with a shimmering tail." }
                         ]
                    },
                    "tap-chi": {
                        text: "Phong cách Tạp chí Thời trang",
                        options: [
                            { text: "Bìa Harper's Bazaar - Lãng mạn & Hoa Mẫu đơn", value: "An elegant Harper's Bazaar-style fashion magazine cover. The text 'Harper's BAZAAR' must be clearly visible and legible at the top in its signature elegant font. A graceful woman sits against a dark, moody green backdrop holding a bouquet of lush pink peonies. She wears a sophisticated pastel green and grey off-shoulder coat. The lighting is gentle and diffused. Add smaller, legible headlines like 'The Art of Style' and 'Modern Romance'. The overall mood is artistic and editorial." },
                            { text: "Bìa Vogue Italy - Thanh lịch & Bí ẩn", value: "A striking close-up fashion portrait for a magazine cover. The text 'VOGUE ITALIA' must be prominently featured at the top in a clear, legible, and correct font. The model is adorned in a wide-brimmed, pleated white hat that dramatically shades her eyes. She wears a flowing white pleated dress. The background is a minimalistic light-toned open space. The aesthetic is elegant and high-fashion." },
                            { text: "Bìa ELLE - Tối giản & Quyền lực", value: "A luxury fashion editorial portrait. The word 'ELLE' must appear at the top in its iconic, large, bold, and crisp font. The setting is a minimalist pure white studio. The woman wears a structured black blazer draped over her shoulders and a white satin bandeau top. A large, sheer white organza bow scarf is around her neck. The styling evokes modern feminine power. Lighting is high-key, diffused, and even." },
                            { text: "Bìa ELLE - Du thuyền & Negroni màu cam", value: "An editorial fashion photo for a magazine cover. The text 'ELLE' must be clear, bold, and correctly spelled at the top. A stylish woman sits on a yacht deck, holding a glass of orange negroni. She wears a luxurious deep brown satin blouse, diamond watch, and jewelry. The image is black and white except for the negroni which is bright orange. The scene is cinematic with soft lighting. Ultra-realistic 8K resolution." },
                            { text: "Bìa Vogue - Lụa & Găng tay ren", value: "A Vogue magazine cover featuring a close-up half-body portrait. The text 'VOGUE' is large, bold, and clearly legible at the top. A beautiful woman poses with elegant hand gestures framing her face. She wears an elegant deep V-neck white silk satin top and short white lace gloves. Her hair is in a messy low bun. The background is bright white. 4K ultra clarity, cinematic lighting." },
                            { text: "Bìa Vogue - Sang trọng bên Đàn Piano", value: "A glamorous high-fashion photo for a magazine cover. The text 'VOGUE' must be clearly visible and spelled correctly at the top. A beautiful woman in a pearl corset and white silk dress lies on a white grand piano in a rich interior. Sunlight streams from a large window. The photography is professional, high-detail, realistic, 8K." },
                            { text: "Bìa Vogue - Quyến rũ & Sắc đỏ", value: "An ultra-realistic VOGUE-style portrait. The text 'VOGUE' is in bold red serif lettering, clearly legible across the top. A stunning woman with a calm expression, lips in a duck face with deep matte red lipstick, and one hand on her jaw. She wears a luxurious deep red satin blouse, cream cat-eye sunglasses, and pearl-gold statement earrings. The lighting is soft and glossy on a minimalistic warm beige gradient background." },
                            { text: "Bìa Vogue Indonesia - Tinh nghịch & Sang trọng", value: "A Vogue Indonesia magazine cover. The text 'VOGUE' is big, bold, and clearly legible at the top, with smaller, readable headlines like 'Jakarta Fashion Week'. A young woman poses playfully, winking and making a duck face, with hands forming a love sign. She is surrounded by hands holding DSLRs capturing her photo. The background is a minimalist beige-white studio. The mood is elegant and playful. Ultra-realistic 8K." },
                            { text: "Bìa Vogue Paris - Tối giản & Mùa thu", value: "A 'VOGUE' Paris magazine cover for the autumn edition. The text 'VOGUE' must be clearly visible and legible. A graceful woman stands on minimalist white marble stairs, wearing an oversized beige knitted sweater and an elegant cream layered ruffle skirt. Soft natural sunlight illuminates the scene. The mood is calm and luxurious. Full body shot, ultra-realistic lighting." },
                            { text: "Bìa Harper's Bazaar - Địa Trung Hải", value: "An elegant Harper's Bazaar-style fashion magazine cover with the clear and correctly spelled text 'Harper's BAZAAR' at the top. A woman with a patterned headscarf and white cat-eye sunglasses wears a strapless dark brown corset-style midi dress. She holds a small white handbag and leans against a beige stucco wall next to light blue wooden window shutters. The style is Mediterranean and chic." }
                        ]
                    }
                },
                locations: {
                    "chau-a": {
                        text: "Châu Á",
                        countries: {
                            "vietnam": { text: "Việt Nam", landmarks: [ { text: "Hoàng hôn trên Vịnh Hạ Long", value: "on a boat watching the sunset in Ha Long Bay, Vietnam." }, { text: "Thả đèn lồng ở Hội An", value: "releasing a lantern in the ancient town of Hoi An, Vietnam." }, { text: "Ruộng bậc thang Sapa", value: "on the edge of a stunning rice terrace in Sapa, Vietnam." }, { text: "Bãi biển Phú Quốc", value: "on the white sands of Phu Quoc beach, Vietnam." }, { text: "Khám phá hang Sơn Đoòng", value: "exploring the majestic Son Doong Cave, Vietnam." }, { text: "Đi dạo trên Cầu Vàng", value: "walking on the Golden Bridge in Da Nang, Vietnam." }, { text: "Trong Kinh thành Huế", value: "inside the Imperial City of Hue, Vietnam." }, { text: "Giữa chợ Bến Thành", value: "in the bustling Ben Thanh Market, Ho Chi Minh City, Vietnam." }, { text: "Đi thuyền ở Đồng bằng sông Cửu Long", value: "on a boat in the Mekong Delta, Vietnam." }, { text: "Thư giãn ở biển Mỹ Khê", value: "relaxing on My Khe Beach, Da Nang, Vietnam." } ] },
                            "nhat-ban": { text: "Nhật Bản", landmarks: [ { text: "Rừng tre Sagano, Kyoto", value: "in the Sagano Bamboo Forest, Kyoto, Japan." }, { text: "Giao lộ Shibuya, Tokyo", value: "at the bustling Shibuya Crossing, Tokyo, Japan." }, { text: "Dưới cây hoa anh đào", value: "under a blooming cherry blossom tree in a park in Japan." }, { text: "Với Núi Phú Sĩ ở phía sau", value: "with Mount Fuji in the background, Japan." }, { text: "Tại Chùa Vàng Kinkaku-ji", value: "at the Golden Pavilion (Kinkaku-ji) in Kyoto, Japan." }, { text: "Trước Lâu đài Himeji", value: "in front of the magnificent Himeji Castle, Japan." }, { text: "Đi qua cổng Torii ở đền Fushimi Inari", value: "walking through the torii gates at Fushimi Inari Shrine, Kyoto." }, { text: "Làng lịch sử Shirakawa-go", value: "in the historic village of Shirakawa-go, Japan." }, { text: "Công viên Tưởng niệm Hòa bình Hiroshima", value: "at the Hiroshima Peace Memorial Park, Japan." }, { text: "Chơi với hươu ở Nara", value: "playing with deer in Nara Park, Japan." } ] },
                            "trung-quoc": { text: "Trung Quốc", landmarks: [ { text: "Đi bộ trên Vạn Lý Trường Thành", value: "walking on the Great Wall of China." }, { text: "Trong Tử Cấm Thành, Bắc Kinh", value: "inside the Forbidden City in Beijing, China." }, { text: "Cảnh quan Trương Gia Giới", value: "amidst the stunning pillar-like mountains of Zhangjiajie, China." }, { text: "Đội quân đất nung, Tây An", value: "with the Terracotta Army in Xi'an, China." }, { text: "Cảnh quan Quế Lâm", value: "on a boat admiring the karst landscape of Guilin, China." }, { text: "Bến Thượng Hải về đêm", value: "on The Bund in Shanghai at night, China." }, { text: "Cung điện Potala, Tây Tạng", value: "in front of the Potala Palace in Lhasa, Tibet, China." }, { text: "Du thuyền trên sông Dương Tử", value: "on a cruise on the Yangtze River, China." }, { text: "Khu bảo tồn Gấu Trúc Lớn Tứ Xuyên", value: "at the Sichuan Giant Panda Sanctuaries, China." }, { text: "Hồ Tây, Hàng Châu", value: "by the West Lake in Hangzhou, China." } ] },
                             "an-do": { text: "Ấn Độ", landmarks: [ { text: "Trước đền Taj Mahal", value: "in front of the Taj Mahal, Agra, India." }, { text: "Trên sông Hằng, Varanasi", value: "on a boat on the Ganges River in Varanasi, India." }, { text: "Lễ hội màu sắc Holi", value: "celebrating the Holi festival in India." }, { text: "Cung điện Hawa Mahal, Jaipur", value: "in front of the Hawa Mahal (Palace of Winds) in Jaipur, India." }, { text: "Backwaters ở Kerala", value: "on a houseboat in the Kerala backwaters, India." }, { text: "Pháo đài Mehrangarh, Jodhpur", value: "at the Mehrangarh Fort in Jodhpur, India." }, { text: "Đền Vàng, Amritsar", value: "at the Golden Temple in Amritsar, India." }, { text: "Các bãi biển ở Goa", value: "on a beach in Goa, India." }, { text: "Hang động Ajanta và Ellora", value: "exploring the Ajanta and Ellora Caves, India." }, { text: "Thành phố Udaipur", value: "overlooking the lakes of Udaipur, the 'City of Lakes', India." } ] }
                        }
                    },
                    "chau-au": {
                        text: "Châu Âu",
                        countries: {
                            "y": { text: "Ý", landmarks: [ { text: "Trước đấu trường Colosseum, Rome", value: "in front of the Colosseum in Rome, Italy." }, { text: "Trên thuyền Gondola, Venice", value: "on a gondola in the canals of Venice, Italy." }, { text: "Tháp nghiêng Pisa", value: "posing with the Leaning Tower of Pisa, Italy." }, { text: "Bờ biển Amalfi", value: "overlooking the stunning Amalfi Coast, Italy." }, { text: "Nhà thờ Florence (Duomo)", value: "in front of the Florence Cathedral (Duomo), Italy." }, { text: "Thành phố cổ Pompeii", value: "exploring the ancient ruins of Pompeii, Italy." }, { text: "Ném đồng xu ở Đài phun nước Trevi", value: "tossing a coin into the Trevi Fountain in Rome, Italy." }, { text: "Quảng trường St. Peter, Vatican", value: "in St. Peter's Square, Vatican City." }, { text: "Làng đầy màu sắc ở Cinque Terre", value: "in the colorful villages of Cinque Terre, Italy." }, { text: "Bên Hồ Como", value: "by the beautiful Lake Como, Italy." } ] },
                            "phap": { text: "Pháp", landmarks: [ { text: "Trước tháp Eiffel, Paris", value: "in front of the Eiffel Tower in Paris, France." }, { text: "Cánh đồng oải hương Provence", value: "in a lavender field in Provence, France." }, { text: "Bảo tàng Louvre (trước kim tự tháp)", value: "in front of the Louvre Pyramid in Paris, France." }, { text: "Cung điện Versailles", value: "in the gardens of the Palace of Versailles, France." }, { text: "Đảo Mont Saint-Michel", value: "looking at the island of Mont Saint-Michel, France." }, { text: "Bờ biển Côte d'Azur (French Riviera)", value: "on the glamorous Côte d'Azur, France." }, { text: "Lâu đài ở Thung lũng Loire", value: "in front of a castle in the Loire Valley, France." }, { text: "Khải Hoàn Môn, Paris", value: "at the Arc de Triomphe in Paris, France." }, { text: "Nhà thờ Đức Bà Paris", value: "in front of the Notre-Dame Cathedral in Paris, France." }, { text: "Đi dạo trên sông Seine", value: "on a Bateaux Mouches boat trip on the Seine river, Paris." } ] },
                            "anh": { text: "Anh & Scotland", landmarks: [ { text: "Cao nguyên Scotland", value: "in the dramatic and beautiful Scottish Highlands." }, { text: "Tháp London và Cầu Tháp", value: "in front of the Tower of London and Tower Bridge." }, { text: "Cung điện Buckingham", value: "in front of Buckingham Palace, London." }, { text: "Mắt London", value: "in a capsule on the London Eye." }, { text: "Vòng tròn đá Stonehenge", value: "standing before the mysterious Stonehenge, England." }, { text: "Hồ Loch Ness, Scotland", value: "by Loch Ness in Scotland." }, { text: "Thành phố Bath cổ kính", value: "at the Roman Baths in the city of Bath, England." }, { text: "Vách đá trắng Dover", value: "on the White Cliffs of Dover, England." }, { text: "Lâu đài Edinburgh, Scotland", value: "in front of Edinburgh Castle, Scotland." }, { text: "Đại học Oxford", value: "at the University of Oxford, England." } ] },
                             "hy-lap": { text: "Hy Lạp", landmarks: [ { text: "Vách đá Santorini", value: "on the cliffs of Santorini overlooking the Aegean Sea, Greece." }, { text: "Thành cổ Acropolis, Athens", value: "at the Acropolis in Athens, Greece." }, { text: "Tu viện Meteora", value: "at the monasteries of Meteora, Greece." }, { text: "Bãi biển Navagio (Shipwreck)", value: "on Navagio (Shipwreck) Beach in Zakynthos, Greece." }, { text: "Cung điện Knossos, Crete", value: "at the Palace of Knossos in Crete, Greece." }, { text: "Thành phố cổ Rhodes", value: "in the old town of Rhodes, Greece." }, { text: "Hẻm núi Samaria, Crete", value: "hiking the Samaria Gorge in Crete, Greece." }, { text: "Nhà hát Epidaurus", value: "at the ancient Theatre of Epidaurus, Greece." }, { text: "Thành phố Mykonos", value: "in the charming streets of Mykonos town, Greece." }, { text: "Di tích Delphi", value: "at the archaeological site of Delphi, Greece." } ] }
                        }
                    },
                    "chau-my": {
                        text: "Châu Mỹ",
                        countries: {
                            "my": { text: "Hoa Kỳ", landmarks: [ { text: "Giữa Quảng trường Thời đại, New York", value: "in the middle of Times Square, New York." }, { text: "Bình minh trên Grand Canyon, Arizona", value: "watching the sunrise over the Grand Canyon, Arizona." }, { text: "Trước Tượng Nữ thần Tự do", value: "in front of the Statue of Liberty, New York." }, { text: "Cầu Cổng Vàng, San Francisco", value: "in front of the Golden Gate Bridge, San Francisco." }, { text: "Vườn quốc gia Yellowstone", value: "at Yellowstone National Park with geysers." }, { text: "Trên Las Vegas Strip", value: "on the Las Vegas Strip at night." }, { text: "Nhà Trắng, Washington D.C.", value: "in front of the White House in Washington D.C." }, { text: "Núi Rushmore, Nam Dakota", value: "at Mount Rushmore in South Dakota." }, { text: "Vườn quốc gia Yosemite, California", value: "in Yosemite National Park, California." }, { text: "Bãi biển Waikiki, Hawaii", value: "on Waikiki Beach in Hawaii." } ] },
                            "peru": { text: "Peru", landmarks: [ { text: "Khám phá Machu Picchu", value: "exploring the ruins of Machu Picchu, Peru." }, { text: "Đường mòn Inca", value: "hiking the Inca Trail to Machu Picchu, Peru." }, { text: "Thành phố Cusco", value: "in the historic city of Cusco, Peru." }, { text: "Ốc đảo Huacachina", value: "at the Huacachina oasis in the Peruvian desert." }, { text: "Đi thuyền trên Hồ Titicaca", value: "on a boat on Lake Titicaca, Peru." }, { text: "Đường Nazca (nhìn từ trên cao)", value: "viewing the Nazca Lines from above, Peru." }, { text: "Hẻm núi Colca", value: "at Colca Canyon, Peru." }, { text: "Rừng rậm Amazon", value: "in the Amazon rainforest of Peru." }, { text: "Núi Cầu vồng Vinicunca", value: "at the Rainbow Mountain (Vinicunca), Peru." }, { text: "Thánh địa Pachacamac", value: "at the Pachacamac sanctuary, Peru." } ] },
                            "brazil": { text: "Brazil", landmarks: [ { text: "Tượng Chúa Cứu thế, Rio", value: "in front of the Christ the Redeemer statue in Rio de Janeiro, Brazil." }, { text: "Bãi biển Copacabana, Rio", value: "on Copacabana beach in Rio de Janeiro, Brazil." }, { text: "Rừng nhiệt đới Amazon", value: "in the Amazon rainforest, Brazil." }, { text: "Lễ hội Carnival ở Rio", value: "at the Carnival in Rio de Janeiro, Brazil." }, { text: "Thác Iguazu (phía Brazil)", value: "at the Iguazu Falls, Brazilian side." }, { text: "Đồi Sugarloaf, Rio", value: "on Sugarloaf Mountain in Rio de Janeiro, Brazil." }, { text: "Trung tâm lịch sử của Salvador", value: "in the historic center of Salvador, Bahia, Brazil." }, { text: "Vùng ngập nước Pantanal", value: "spotting wildlife in the Pantanal wetlands, Brazil." }, { text: "Quần đảo Fernando de Noronha", value: "on the beaches of Fernando de Noronha, Brazil." }, { text: "Lençóis Maranhenses", value: "at Lençóis Maranhenses National Park, Brazil." } ] }
                        }
                    },
                    "trung-dong-chau-phi": {
                        text: "Trung Đông & Châu Phi",
                        countries: {
                            "ai-cap": { text: "Ai Cập", landmarks: [ { text: "Cưỡi lạc đà trước Kim tự tháp Giza", value: "riding a camel in front of the Giza Pyramids, Egypt." }, { text: "Thung lũng các vị vua, Luxor", value: "in the Valley of the Kings, Luxor, Egypt." }, { text: "Đền Karnak, Luxor", value: "at the Karnak Temple Complex in Luxor, Egypt." }, { text: "Đền Abu Simbel", value: "in front of the Abu Simbel temples, Egypt." }, { text: "Du thuyền trên sông Nile", value: "on a cruise on the Nile River, Egypt." }, { text: "Thư viện Alexandria", value: "in front of the Library of Alexandria, Egypt." }, { text: "Sa mạc Trắng", value: "in the White Desert, Egypt." }, { text: "Khu chợ Khan el-Khalili, Cairo", value: "at the Khan el-Khalili bazaar in Cairo, Egypt." }, { text: "Lặn biển ở Biển Đỏ", value: "scuba diving in the Red Sea, Egypt." }, { text: "Tu viện St. Catherine", value: "at Saint Catherine's Monastery, Sinai, Egypt." } ] },
                            "morocco": { text: "Morocco", landmarks: [ { text: "Thành phố xanh Chefchaouen", value: "in the blue city of Chefchaouen, Morocco." }, { text: "Quảng trường Djemaa el-Fna, Marrakech", value: "in the Djemaa el-Fna square in Marrakech, Morocco." }, { text: "Vườn Majorelle, Marrakech", value: "in the Majorelle Garden in Marrakech, Morocco." }, { text: "Sa mạc Erg Chebbi", value: "in the Erg Chebbi desert dunes, Morocco." }, { text: "Dãy núi Atlas", value: "in the Atlas Mountains, Morocco." }, { text: "Thành phố cổ Ait Benhaddou", value: "at the ancient city of Ait Benhaddou, Morocco." }, { text: "Thành phố Fes", value: "in the medina of Fes, Morocco." }, { text: "Nhà thờ Hồi giáo Hassan II, Casablanca", value: "at the Hassan II Mosque in Casablanca, Morocco." }, { text: "Thành phố biển Essaouira", value: "in the coastal city of Essaouira, Morocco." }, { text: "Hẻm núi Todra", value: "in the Todra Gorge, Morocco." } ] },
                            "tanzania": { text: "Tanzania", landmarks: [ { text: "Cuộc đại di cư ở Serengeti", value: "watching the Great Migration in the Serengeti, Tanzania." }, { text: "Trên đỉnh Núi Kilimanjaro", value: "on the summit of Mount Kilimanjaro, Tanzania." }, { text: "Miệng núi lửa Ngorongoro", value: "overlooking the Ngorongoro Crater, Tanzania." }, { text: "Bãi biển ở Zanzibar", value: "on a beach in Zanzibar, Tanzania." } ] }
                        }
                    },
                    "vien-tuong": {
                        text: "Viễn Tưởng & Ngoài Trái Đất",
                        countries: {
                            "khong-gian": { text: "Không gian & Viễn tưởng", landmarks: [ { text: "Trên bề mặt Sao Hỏa", value: "on the surface of Mars with a desolate landscape." }, { text: "Đi bộ trên Mặt Trăng", value: "walking on the Moon with the Earth in the background." }, { text: "Thành phố cyberpunk tương lai", value: "in a futuristic cyberpunk city with neon lights." }, { text: "Ngai vàng trong lâu đài pha lê", value: "on a throne in a crystal castle." }, { text: "Khu rừng thần tiên phát sáng", value: "in a glowing enchanted forest." }, { text: "Thành phố dưới nước Atlantis", value: "in the underwater city of Atlantis." }, { text: "Trên một con rồng đang bay", value: "riding a flying dragon over mountains." }, { text: "Trong một thư viện vô tận", value: "in an infinite library." }, { text: "Thành phố trên mây", value: "in a city floating in the clouds." }, { text: "Khám phá một hành tinh xa lạ", value: "exploring an alien planet with strange flora." } ] }
                        }
                    },
                    "studio": {
                        text: "Studio",
                        countries: {
                             "studio-phong-nen": {
                                text: "Phông nền Studio",
                                landmarks: [
                                    { text: "Phông nền trắng tối giản", value: "in a minimalist studio with a pure white background." },
                                    { text: "Phông nền đen kịch tính", value: "in a studio with a dramatic, deep black backdrop." },
                                    { text: "Phông nền xám bê tông", value: "in a modern studio with a textured concrete gray wall." },
                                    { text: "Phông nền màu pastel (hồng, xanh)", value: "in a studio with a soft pastel-colored (e.g., pink, baby blue) background." },
                                    { text: "Phông nền vải lụa mềm mại", value: "in a studio with a backdrop of soft, flowing silk fabric." },
                                    { text: "Phòng có cửa sổ lớn và ánh sáng tự nhiên", value: "in a bright studio loft with a large window and beautiful natural light." },
                                    { text: "Studio với đèn neon", value: "in a dark studio filled with vibrant neon lights." },
                                    { text: "Phông nền hoa cỏ nhiệt đới", value: "in a studio with a lush, tropical floral and leafy backdrop." },
                                    { text: "Studio phong cách công nghiệp (tường gạch)", value: "in an industrial-style studio with an exposed brick wall." },
                                    { text: "Phông nền giấy màu trừu tượng", value: "in a studio with an abstract backdrop made of overlapping colored paper shapes." }
                                ]
                            }
                        }
                    }
                }
            };
            
            // --- Element Selection ---
            const faceFrontUploadInput = document.getElementById('face-front-upload');
            const faceLeftUploadInput = document.getElementById('face-left-upload');
            const faceRightUploadInput = document.getElementById('face-right-upload');
            const accessoriesUploadInput = document.getElementById('accessories-upload');

            const faceFrontPreviewPlaceholder = document.getElementById('face-front-preview-placeholder');
            const faceLeftPreviewPlaceholder = document.getElementById('face-left-preview-placeholder');
            const faceRightPreviewPlaceholder = document.getElementById('face-right-preview-placeholder');
            const accessoriesPreviewPlaceholder = document.getElementById('accessories-preview-placeholder');

            const faceFrontImgPreview = document.getElementById('face-front-img-preview');
            const faceLeftImgPreview = document.getElementById('face-left-img-preview');
            const faceRightImgPreview = document.getElementById('face-right-img-preview');
            const accessoriesImgPreview = document.getElementById('accessories-img-preview');

            const faceFrontRemoveBtn = document.getElementById('face-front-remove-btn');
            const faceLeftRemoveBtn = document.getElementById('face-left-remove-btn');
            const faceRightRemoveBtn = document.getElementById('face-right-remove-btn');
            const accessoriesRemoveBtn = document.getElementById('accessories-remove-btn');

            const captureFaceFrontBtn = document.getElementById('capture-face-front-btn');
            const captureFaceLeftBtn = document.getElementById('capture-face-left-btn');
            const captureFaceRightBtn = document.getElementById('capture-face-right-btn');
            const captureAccessoriesBtn = document.getElementById('capture-accessories-btn');
            
            const toggleGuideBtn = document.getElementById('toggle-guide-btn');
            const guideContent = document.getElementById('guide-content');
            const guideArrow = document.getElementById('guide-arrow');

            const contextButtons = document.getElementById('context-buttons');
            
            const dynamicOptionsContainer = document.getElementById('dynamic-options-container');

            const locationOptionsTemplate = document.getElementById('location-options-template');
            const studioOptionsTemplate = document.getElementById('studio-options-template');
            const magazineOptionsTemplate = document.getElementById('magazine-options-template');

            const characterStyleOptions = document.getElementById('character-style-options');
            const styleSelect = document.getElementById('style-select');

            const promptInput = document.getElementById('prompt-input');
            const generateBtn = document.getElementById('generate-btn');
            const suggestDetailsBtn = document.getElementById('suggest-details-btn');
            const suggestBtnText = document.getElementById('suggest-btn-text');
            const suggestSpinner = document.getElementById('suggest-spinner');
            const suggestIcon = document.getElementById('suggest-icon');
            const errorMessage = document.getElementById('error-message');

            const resultContainer = document.getElementById('result-container');
            const loadingIndicator = document.getElementById('loading-indicator');
            const placeholderText = document.getElementById('placeholder-text');
            const resultImg = document.getElementById('result-img');
            const progressBar = document.getElementById('progress-bar');
            const progressText = document.getElementById('progress-text');
            
            const imageActions = document.getElementById('image-actions');
            const downloadContainer = document.getElementById('download-container');
            const zoomBtn = document.getElementById('zoom-btn');
            const downloadBtn = document.getElementById('download-btn');
            
            // Zoom Modal Elements
            const zoomModal = document.getElementById('zoom-modal');
            const zoomedImg = document.getElementById('zoomed-img');
            const closeZoomModalBtn = document.getElementById('close-zoom-modal-btn');
            
            // Camera Modal Elements
            const cameraModal = document.getElementById('camera-modal');
            const cameraStream = document.getElementById('camera-stream');
            const captureCanvas = document.getElementById('capture-canvas');
            const takePhotoBtn = document.getElementById('take-photo-btn');
            const closeCameraModalBtn = document.getElementById('close-camera-modal-btn');
            
            // --- Functions to Populate Selects ---
            const populateSelectWithOptions = (selectElement, options, placeholderText) => {
                if (!selectElement) return;
                selectElement.innerHTML = '';
                const placeholder = document.createElement('option');
                placeholder.value = "";
                placeholder.textContent = placeholderText;
                selectElement.appendChild(placeholder);
                options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt.value;
                    option.textContent = opt.text;
                    selectElement.appendChild(option);
                });
            };

            const populateSelectWithGroups = (selectElement, groups, placeholderText) => {
                if (!selectElement) return;
                selectElement.innerHTML = '';
                 const placeholder = document.createElement('option');
                placeholder.value = "";
                placeholder.textContent = placeholderText;
                selectElement.appendChild(placeholder);
                for (const key in groups) {
                    const group = groups[key];
                    const optgroup = document.createElement('optgroup');
                    optgroup.label = group.text;
                    group.options.forEach(opt => {
                        const option = document.createElement('option');
                        option.value = opt.value;
                        option.textContent = opt.text;
                        optgroup.appendChild(option);
                    });
                    selectElement.appendChild(optgroup);
                }
            };

            const populateSelectFromObject = (selectElement, object, placeholderText) => {
                if (!selectElement) return;
                 selectElement.innerHTML = '';
                 const placeholder = document.createElement('option');
                placeholder.value = "";
                placeholder.textContent = placeholderText;
                selectElement.appendChild(placeholder);
                for (const key in object) {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = object[key].text;
                    selectElement.appendChild(option);
                }
            }


            // --- Initial Population ---
            populateSelectWithGroups(styleSelect, { "co-dien": data.styles["co-dien"], "hien-dai": data.styles["hien-dai"] }, '-- Chọn một phong cách --');
            
            // --- File Handling and Previews ---
            const handleFile = (file, dataStore, placeholder, imgPreview, removeBtn) => {
                if (!file || !file.type.startsWith('image/')) return;

                const reader = new FileReader();
                reader.onload = (e) => handleCapturedImage(e.target.result, file.type, dataStore, placeholder, imgPreview, removeBtn);
                reader.readAsDataURL(file);
            };
            
            const handleCapturedImage = (dataUrl, mimeType, dataStore, placeholder, imgPreview, removeBtn) => {
                dataStore.data = dataUrl.split(',')[1];
                dataStore.mimeType = mimeType;
                imgPreview.src = dataUrl;
                imgPreview.classList.remove('hidden');
                placeholder.classList.add('hidden');
                removeBtn.classList.remove('hidden');
            };
            
            const clearUpload = (dataStore, input, placeholder, imgPreview, removeBtn) => {
                dataStore.data = null;
                dataStore.mimeType = null;
                if(input) input.value = '';
                imgPreview.src = '';
                imgPreview.classList.add('hidden');
                placeholder.classList.remove('hidden');
                removeBtn.classList.add('hidden');
            };

            const setupUploadBox = (containerId, input, dataStore, placeholder, imgPreview, removeBtn) => {
                const container = document.getElementById(containerId);
                if (!container) return;
                const uploadBox = container.querySelector('.upload-box');
                 if (!uploadBox) return;
                ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                    container.addEventListener(eventName, e => {
                        e.preventDefault();
                        e.stopPropagation();
                    }, false);
                });
                ['dragenter', 'dragover'].forEach(eventName => {
                    container.addEventListener(eventName, () => uploadBox.classList.add('dragover'), false);
                });
                ['dragleave', 'drop'].forEach(eventName => {
                    container.addEventListener(eventName, () => uploadBox.classList.remove('dragover'), false);
                });
                container.addEventListener('drop', e => {
                    const dt = e.dataTransfer;
                    const files = dt.files;
                    if (files && files.length > 0) {
                        input.files = files;
                        handleFile(files[0], dataStore, placeholder, imgPreview, removeBtn);
                    }
                }, false);
                input.addEventListener('change', (e) => {
                     const file = e.target.files[0];
                     if(file) {
                        handleFile(file, dataStore, placeholder, imgPreview, removeBtn);
                     }
                });
                removeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    clearUpload(dataStore, input, placeholder, imgPreview, removeBtn);
                });
            };

            setupUploadBox('face-front-upload-container', faceFrontUploadInput, faceFrontStore, faceFrontPreviewPlaceholder, faceFrontImgPreview, faceFrontRemoveBtn);
            setupUploadBox('face-left-upload-container', faceLeftUploadInput, faceLeftStore, faceLeftPreviewPlaceholder, faceLeftImgPreview, faceLeftRemoveBtn);
            setupUploadBox('face-right-upload-container', faceRightUploadInput, faceRightStore, faceRightPreviewPlaceholder, faceRightImgPreview, faceRightRemoveBtn);
            setupUploadBox('accessories-upload-container', accessoriesUploadInput, accessoriesStore, accessoriesPreviewPlaceholder, accessoriesImgPreview, accessoriesRemoveBtn);

            // --- Camera Logic ---
            const startCamera = async (target) => {
                captureTarget = target;
                try {
                    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                        activeStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                        cameraStream.srcObject = activeStream;
                        cameraModal.classList.remove('hidden');
                    } else {
                        throw new Error("Camera not supported by this browser.");
                    }
                } catch(err) {
                    console.error("Error accessing camera:", err);
                    errorMessage.textContent = "Không thể truy cập camera. Vui lòng kiểm tra quyền và thử lại.";
                    errorMessage.classList.remove('hidden');
                }
            };

            const stopCamera = () => {
                if (activeStream) {
                    activeStream.getTracks().forEach(track => track.stop());
                    activeStream = null;
                    cameraStream.srcObject = null;
                }
                captureTarget = null;
            };

            captureFaceFrontBtn.addEventListener('click', () => startCamera('face-front'));
            captureFaceLeftBtn.addEventListener('click', () => startCamera('face-left'));
            captureFaceRightBtn.addEventListener('click', () => startCamera('face-right'));
            captureAccessoriesBtn.addEventListener('click', () => startCamera('accessories'));

            closeCameraModalBtn.addEventListener('click', () => {
                stopCamera();
                cameraModal.classList.add('hidden');
            });

            takePhotoBtn.addEventListener('click', () => {
                const context = captureCanvas.getContext('2d');
                captureCanvas.width = cameraStream.videoWidth;
                captureCanvas.height = cameraStream.videoHeight;
                context.translate(captureCanvas.width, 0);
                context.scale(-1, 1);
                context.drawImage(cameraStream, 0, 0, captureCanvas.width, captureCanvas.height);
                
                const dataUrl = captureCanvas.toDataURL('image/jpeg');
                
                if (captureTarget === 'face-front') {
                    handleCapturedImage(dataUrl, 'image/jpeg', faceFrontStore, faceFrontPreviewPlaceholder, faceFrontImgPreview, faceFrontRemoveBtn);
                } else if (captureTarget === 'face-left') {
                    handleCapturedImage(dataUrl, 'image/jpeg', faceLeftStore, faceLeftPreviewPlaceholder, faceLeftImgPreview, faceLeftRemoveBtn);
                } else if (captureTarget === 'face-right') {
                    handleCapturedImage(dataUrl, 'image/jpeg', faceRightStore, faceRightPreviewPlaceholder, faceRightImgPreview, faceRightRemoveBtn);
                } else if (captureTarget === 'accessories') {
                    handleCapturedImage(dataUrl, 'image/jpeg', accessoriesStore, accessoriesPreviewPlaceholder, accessoriesImgPreview, accessoriesRemoveBtn);
                }
                
                stopCamera();
                cameraModal.classList.add('hidden');
            });
            
            // --- Dynamic UI Logic ---
            toggleGuideBtn.addEventListener('click', () => {
                guideContent.classList.toggle('hidden');
                guideArrow.classList.toggle('rotate-180');
            });
            
            const setupLocationListeners = (container) => {
                const region = container.querySelector('#region-select');
                const country = container.querySelector('#country-select');
                const landmark = container.querySelector('#landmark-select');
                
                const regionsForLocation = { ...data.locations };
                delete regionsForLocation.studio;
                populateSelectFromObject(region, regionsForLocation, '-- Vui lòng chọn khu vực --');

                region.addEventListener('change', () => {
                    const selectedRegionKey = region.value;
                    const countries = data.locations[selectedRegionKey]?.countries || {};
                    populateSelectFromObject(country, countries, '-- Chọn quốc gia --');
                    country.disabled = !selectedRegionKey || Object.keys(countries).length === 0;
                    landmark.innerHTML = '<option value="">-- Chọn quốc gia trước --</option>';
                    landmark.disabled = true;
                    promptInput.value = '';
                });

                country.addEventListener('change', () => {
                    const regionKey = region.value;
                    const countryKey = country.value;
                    const landmarks = data.locations[regionKey]?.countries[countryKey]?.landmarks || [];
                    populateSelectWithOptions(landmark, landmarks, '-- Chọn địa danh --');
                    landmark.disabled = !countryKey || landmarks.length === 0;
                     promptInput.value = '';
                });

                 landmark.addEventListener('change', () => {
                    promptInput.value = '';
                });
            };

            contextButtons.addEventListener('click', (e) => {
                const button = e.target.closest('.context-btn');
                if (!button) return;

                document.querySelectorAll('.context-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const context = button.dataset.context;
                selectedContext = context;
                
                dynamicOptionsContainer.innerHTML = '';
                characterStyleOptions.classList.add('hidden');
                
                if (context === 'location') {
                    const locationClone = locationOptionsTemplate.content.cloneNode(true);
                    dynamicOptionsContainer.appendChild(locationClone);
                    setupLocationListeners(dynamicOptionsContainer);
                    characterStyleOptions.classList.remove('hidden');
                } else if (context === 'studio') {
                    const studioClone = studioOptionsTemplate.content.cloneNode(true);
                    dynamicOptionsContainer.appendChild(studioClone);
                    const studioSelectEl = dynamicOptionsContainer.querySelector('#studio-select');
                    populateSelectWithOptions(studioSelectEl, data.locations.studio.countries['studio-phong-nen'].landmarks, '-- Chọn phông nền --');
                    studioSelectEl.addEventListener('change', () => promptInput.value = '');
                    characterStyleOptions.classList.remove('hidden');
                } else if (context === 'magazine') {
                    const magazineClone = magazineOptionsTemplate.content.cloneNode(true);
                    dynamicOptionsContainer.appendChild(magazineClone);
                    const magStyleSelect = dynamicOptionsContainer.querySelector('#magazine-style-select');
                    const magBgTypeSelect = dynamicOptionsContainer.querySelector('#magazine-background-type-select');
                    const magNestedContainer = dynamicOptionsContainer.querySelector('#magazine-nested-options-container');
                    
                    populateSelectWithOptions(magStyleSelect, data.styles['tap-chi'].options, '-- Chọn phong cách bìa --');

                    magStyleSelect.addEventListener('change', () => promptInput.value = '');
                    
                    magBgTypeSelect.addEventListener('change', () => {
                        const type = magBgTypeSelect.value;
                        magNestedContainer.innerHTML = '';
                        if (type === 'location') {
                            const locationCloneNested = locationOptionsTemplate.content.cloneNode(true);
                            magNestedContainer.appendChild(locationCloneNested);
                            setupLocationListeners(magNestedContainer);
                        } else if (type === 'studio') {
                             const studioCloneNested = studioOptionsTemplate.content.cloneNode(true);
                            magNestedContainer.appendChild(studioCloneNested);
                            const nestedStudioSelect = magNestedContainer.querySelector('#studio-select');
                            populateSelectWithOptions(nestedStudioSelect, data.locations.studio.countries['studio-phong-nen'].landmarks, '-- Chọn phông nền --');
                            nestedStudioSelect.addEventListener('change', () => promptInput.value = '');
                        }
                    });
                }
            });
            
            // --- Suggest Details Logic ---
            suggestDetailsBtn.addEventListener('click', async () => {
                let background = '';
                let style = '';
                const context = selectedContext;
                const container = dynamicOptionsContainer;

                if (context === 'location') {
                    const landmarkSelect = container.querySelector('#landmark-select');
                    background = landmarkSelect?.options[landmarkSelect.selectedIndex]?.text || '';
                    style = styleSelect.options[styleSelect.selectedIndex]?.text || '';
                } else if (context === 'studio') {
                    const studioSelectEl = container.querySelector('#studio-select');
                    background = studioSelectEl?.options[studioSelectEl.selectedIndex]?.text || '';
                    style = styleSelect.options[styleSelect.selectedIndex]?.text || '';
                } else if (context === 'magazine') {
                    const magStyleSelect = container.querySelector('#magazine-style-select');
                    style = magStyleSelect?.options[magStyleSelect.selectedIndex]?.text || '';
                     const backgroundType = container.querySelector('#magazine-background-type-select')?.value;
                    if (backgroundType === 'location') {
                         const landmarkSelect = container.querySelector('#landmark-select');
                         background = landmarkSelect?.options[landmarkSelect.selectedIndex]?.text || '';
                    } else if (backgroundType === 'studio') {
                        const studioSelectEl = container.querySelector('#studio-select');
                        background = studioSelectEl?.options[studioSelectEl.selectedIndex]?.text || '';
                    }
                }

                const currentPrompt = promptInput.value.trim();

                suggestDetailsBtn.disabled = true;
                suggestBtnText.textContent = 'Đang gợi ý...';
                suggestSpinner.classList.remove('hidden');
                suggestIcon.classList.add('hidden');
                
                const systemPrompt = "Bạn là một đạo diễn hình ảnh và nhiếp ảnh gia bậc thầy. Nhiệm vụ của bạn là tạo ra một lời nhắc (prompt) cực kỳ chi tiết, gợi hình cho một công cụ tạo ảnh AI. Lời nhắc này phải là một đoạn văn ngắn (2-3 câu) mô tả một cảnh hoàn chỉnh. Hãy mô tả sống động các yếu tố sau: 1. **Ánh sáng:** (ví dụ: ánh sáng vàng lúc hoàng hôn, ánh sáng dịu qua cửa sổ, ánh sáng neon rực rỡ). 2. **Góc máy:** (ví dụ: góc máy rộng toàn cảnh, ảnh chụp cận mặt, góc máy thấp hất lên). 3. **Tâm trạng & Cảm xúc:** (ví dụ: lãng mạn và mơ màng, mạnh mẽ và quyền lực, vui vẻ và năng động). 4. **Chi tiết bổ sung:** (ví dụ: có những cánh hoa bay trong gió, mặt đường ẩm ướt phản chiếu ánh đèn, một làn sương mỏng bao phủ). Hãy kết hợp các lựa chọn của người dùng một cách liền mạch để tạo ra một kịch bản hình ảnh hấp dẫn và chuyên nghiệp. KHÔNG được chỉ lặp lại các lựa chọn của người dùng.";
                
                let userQuery = "Tạo một mô tả cảnh sử dụng các yếu tố sau:\n";
                if (background && background.includes('--') === false) userQuery += `- Phông nền: ${background}\n`;
                if (style && style.includes('--') === false) userQuery += `- Phong cách: ${style}\n`;
                if (currentPrompt) userQuery += `- Chi tiết bổ sung: ${currentPrompt}`;

                const payload = {
                    contents: [{ parts: [{ text: userQuery }] }],
                    systemInstruction: { parts: [{ text: systemPrompt }] },
                };

                const apiKey = "";
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    if (!response.ok) throw new Error(`API request failed with status: ${response.status}`);
                    const result = await response.json();
                    const suggestion = result.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (suggestion) promptInput.value = suggestion.trim();
                    else console.error("No suggestion found in response:", result);
                } catch (error) {
                    console.error('Error getting suggestion:', error);
                } finally {
                    suggestDetailsBtn.disabled = false;
                    suggestBtnText.textContent = 'Gợi Ý Chi Tiết';
                    suggestSpinner.classList.add('hidden');
                    suggestIcon.classList.remove('hidden');
                }
            });

            // --- Image Generation Main Logic ---
            const setLoadingState = (isLoading) => {
                generateBtn.disabled = isLoading;
                if (isLoading) {
                    generateBtn.innerHTML = '<div class="loader w-6 h-6 mx-auto rounded-full border-4 border-gray-200"></div>';
                    progressBar.style.width = '0%';
                    progressText.textContent = '0%';
                    loadingIndicator.classList.remove('hidden');
                    resultContainer.classList.add('loading-active');
                    placeholderText.classList.add('hidden');
                    resultImg.classList.add('hidden');
                    imageActions.classList.add('hidden');
                    downloadContainer.classList.add('hidden');
                    
                    let progress = 0;
                    const totalDuration = 15000;
                    const intervalTime = 200;
                    const steps = totalDuration / intervalTime;
                    const increment = 100 / steps;
                    
                    progressInterval = setInterval(() => {
                        progress += increment;
                        if (progress >= 99) {
                            progress = 99;
                            clearInterval(progressInterval);
                        }
                        const displayProgress = Math.floor(progress);
                        progressBar.style.width = `${displayProgress}%`;
                        progressText.textContent = `${displayProgress}%`;
                    }, intervalTime);

                } else {
                    generateBtn.textContent = 'Tạo Ảnh';
                    loadingIndicator.classList.add('hidden');
                    resultContainer.classList.remove('loading-active');
                    clearInterval(progressInterval);
                }
            };
            
            const validateInputs = () => {
                if (!faceFrontStore.data) {
                    errorMessage.textContent = 'Cần tải lên hình ảnh gương mặt góc chính diện.';
                    errorMessage.classList.remove('hidden');
                    return false;
                }

                const context = selectedContext;
                 if (!context) {
                     errorMessage.textContent = 'Cần chọn một loại bối cảnh.';
                     errorMessage.classList.remove('hidden');
                     return false;
                }

                if (context === 'location' && !dynamicOptionsContainer.querySelector('#landmark-select')?.value) {
                     errorMessage.textContent = 'Cần chọn một địa danh.';
                     errorMessage.classList.remove('hidden');
                     return false;
                } else if (context === 'studio' && !dynamicOptionsContainer.querySelector('#studio-select')?.value) {
                     errorMessage.textContent = 'Cần chọn một phông nền studio.';
                     errorMessage.classList.remove('hidden');
                     return false;
                } else if (context === 'magazine' && !dynamicOptionsContainer.querySelector('#magazine-style-select')?.value) {
                     errorMessage.textContent = 'Cần chọn một phong cách bìa tạp chí.';
                     errorMessage.classList.remove('hidden');
                     return false;
                }

                errorMessage.classList.add('hidden');
                return true;
            };
            
             const displayResultImage = (originalDataUrl) => {
                resultImg.src = originalDataUrl;
                resultImg.classList.remove('hidden');
                resultImg.classList.add('fade-in');
                imageActions.classList.remove('hidden');
                downloadContainer.classList.remove('hidden');
                downloadContainer.classList.add('fade-in');
            };


            const buildApiPayload = () => {
                const prompt = promptInput.value.trim();
                const context = selectedContext;
                
                let background = '';
                let style = '';

                if(context === 'location') {
                    background = dynamicOptionsContainer.querySelector('#landmark-select')?.value || '';
                    style = styleSelect.value;
                } else if (context === 'studio') {
                    background = dynamicOptionsContainer.querySelector('#studio-select')?.value || '';
                    style = styleSelect.value;
                } else if (context === 'magazine') {
                    style = dynamicOptionsContainer.querySelector('#magazine-style-select')?.value || '';
                    const backgroundType = dynamicOptionsContainer.querySelector('#magazine-background-type-select')?.value;
                    if (backgroundType === 'location') {
                        background = dynamicOptionsContainer.querySelector('#landmark-select')?.value || '';
                    } else if (backgroundType === 'studio') {
                        background = dynamicOptionsContainer.querySelector('#studio-select')?.value || '';
                    }
                     if (!dynamicOptionsContainer.querySelector('#magazine-text-toggle')?.checked) {
                        style += " CRITICAL INSTRUCTION: Generate the image based on this style BUT COMPLETELY OMIT any and all text, magazine titles (like 'VOGUE', 'ELLE'), logos, and typography. The final output must be a clean photograph with no text overlays whatsoever.";
                    }
                }
                
                let finalPrompt = "";
                if (style) finalPrompt += `${style} `;
                if (background) finalPrompt += `The person is ${background}. `;
                if (prompt) finalPrompt += prompt;
                if (!finalPrompt) finalPrompt = "A photorealistic lifestyle photo.";

                const parts = [];
                let combinedPrompt = `Your most important and critical task is to generate a photorealistic image where the subject's face is an EXACT 1:1 match to the person in the provided reference photos. Do not alter, modify, or reinterpret their facial structure, features (eyes, nose, mouth), skin tone, or identity in any way. This is a strict requirement. The generated face must be hyper-realistic, highly detailed, sharp, and clear, with natural skin texture, including pores. The final image should have the quality of a professional DSLR photograph.`;
                
                if (faceLeftStore.data && faceRightStore.data) {
                    combinedPrompt += ` You have been given three reference angles (front, left, right) to ensure a perfect three-dimensional and faithful recreation.`;
                } else {
                    combinedPrompt += ` Use the provided front-view photo as the absolute reference for the person's face.`;
                }
                
                if (accessoriesStore.data) {
                    combinedPrompt += ` Additionally, the person should wear accessories inspired by the final image in the sequence.`;
                }

                combinedPrompt += ` After ensuring the face is a perfect match, place this person into the following scene: ${finalPrompt}. The final composition must be seamless and cohesive.`;

                parts.push({ text: combinedPrompt });
                
                parts.push({ inlineData: { mimeType: faceFrontStore.mimeType, data: faceFrontStore.data } });
                if (faceLeftStore.data) parts.push({ inlineData: { mimeType: faceLeftStore.mimeType, data: faceLeftStore.data } });
                if (faceRightStore.data) parts.push({ inlineData: { mimeType: faceRightStore.mimeType, data: faceRightStore.data } });
                if (accessoriesStore.data) parts.push({ inlineData: { mimeType: accessoriesStore.mimeType, data: accessoriesStore.data } });
                
                const systemPrompt = "You are an advanced AI image generator specializing in photorealistic portraits. Your primary function is to create a single, high-quality image that strictly adheres to the user's instructions, especially regarding facial likeness from reference photos. You MUST return an image and not a text-only response.";

                return {
                    contents: [{ parts }],
                    systemInstruction: { parts: [{ text: systemPrompt }] },
                    generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
                };
            };
            
            const handleApiResponse = (result) => {
                clearInterval(progressInterval);
                progressBar.style.width = '100%';
                progressText.textContent = '100%';

                const imagePart = result?.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
                
                if (imagePart) {
                    const originalDataUrl = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
                    displayResultImage(originalDataUrl);
                } else {
                    console.error("No image data found in response:", result);
                    if (result.candidates && result.candidates[0]?.finishReason === 'IMAGE_OTHER' && result.candidates[0]?.finishMessage) {
                        errorMessage.textContent = 'AI từ chối tạo ảnh do chính sách an toàn. Thử một phong cách hoặc ảnh mặt khác.';
                    } else if (result.promptFeedback && result.promptFeedback.blockReason) {
                        errorMessage.textContent = `Yêu cầu bị chặn: ${result.promptFeedback.blockReason}. Vui lòng thử một lời nhắc khác.`;
                    }
                    else {
                        errorMessage.textContent = 'Không thể tạo ảnh. Vui lòng thử một lời nhắc hoặc hình ảnh khác.';
                    }
                    errorMessage.classList.remove('hidden');
                    placeholderText.classList.remove('hidden');
                }
            };

            const generateImage = async () => {
                if (!validateInputs()) return;

                setLoadingState(true);
                const payload = buildApiPayload();
                
                const apiKey = "";
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;

                try {
                    let response;
                    for (let i = 0; i < 5; i++) {
                        response = await fetch(apiUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });
                        if (response.ok) break;
                        if (response.status === 429 || response.status >= 500) {
                            await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000 + Math.random() * 1000));
                        } else { throw new Error(`API request failed with status: ${response.status}`); }
                    }
                    if (!response || !response.ok) { throw new Error(`API request failed after multiple retries.`); }

                    const result = await response.json();
                    handleApiResponse(result);

                } catch (error) {
                    console.error('Error generating image:', error);
                    clearInterval(progressInterval);
                    errorMessage.textContent = `Đã xảy ra lỗi: ${error.message}. Vui lòng thử lại.`;
                    errorMessage.classList.remove('hidden');
                    placeholderText.classList.remove('hidden');
                } finally {
                    setLoadingState(false);
                }
            };

            generateBtn.addEventListener('click', generateImage);
            
            // --- Modal & Action Button Logic ---
            zoomBtn.addEventListener('click', () => {
                zoomedImg.src = resultImg.src;
                zoomModal.classList.remove('hidden');
            });

            const closeZoomModal = () => zoomModal.classList.add('hidden');
            closeZoomModalBtn.addEventListener('click', closeZoomModal);
            zoomModal.addEventListener('click', (e) => {
                if (e.target === zoomModal) closeZoomModal();
            });

            downloadBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                if (!resultImg.src || resultImg.src.startsWith('http')) return; 

                try {
                    const response = await fetch(resultImg.src);
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'dep-plus.png';
                    
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    URL.revokeObjectURL(url);
                } catch (error) {
                    console.error('Download failed:', error);
                    errorMessage.textContent = 'Tải xuống thất bại. Vui lòng thử lại.';
                    errorMessage.classList.remove('hidden');
                }
            });
        });

    </script>
</body>
</html>

