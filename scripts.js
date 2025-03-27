document.addEventListener('DOMContentLoaded', function() {
    // 키워드 필터 기능
    const keywordTags = document.querySelectorAll('.keyword-tag');
    const posts = document.querySelectorAll('.post-item');
    
    keywordTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 활성화된 태그 스타일 변경
            keywordTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const selectedCategory = this.textContent;
            
            // 게시물 필터링
            posts.forEach(post => {
                const postCategory = post.querySelector('.post-category').textContent;
                
                if (selectedCategory === '전체' || selectedCategory === postCategory) {
                    post.style.display = 'flex';
                    // 애니메이션 효과
                    post.style.opacity = '0';
                    setTimeout(() => {
                        post.style.opacity = '1';
                    }, 50);
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // 검색 기능
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const searchTerm = searchInput.value.toLowerCase();
        
        posts.forEach(post => {
            const title = post.querySelector('h2').textContent.toLowerCase();
            const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
            const category = post.querySelector('.post-category').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || 
                excerpt.includes(searchTerm) || 
                category.includes(searchTerm)) {
                post.style.display = 'flex';
                // 검색 결과 하이라이트 효과
                post.style.animation = 'highlight 1s';
            } else {
                post.style.display = 'none';
            }
        });

        // 검색 후 "전체" 태그만 활성화
        keywordTags.forEach(tag => {
            if (tag.textContent === '전체') {
                tag.classList.add('active');
            } else {
                tag.classList.remove('active');
            }
        });
    });
});

// 검색 결과 하이라이트 애니메이션을 위한 CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes highlight {
        0% { background-color: rgba(33, 150, 243, 0.1); }
        100% { background-color: white; }
    }
`;
document.head.appendChild(style); 