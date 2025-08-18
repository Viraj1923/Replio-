// mobile.js - ADD THIS NEW FILE
document.addEventListener('DOMContentLoaded', function() {
    let sidebarOpen = false;
    
    // Create hamburger menu functionality
    document.addEventListener('click', function(e) {
      const navbar = document.querySelector('.navbar');
      const sidebar = document.querySelector('.sidebar');
      
      // Check if clicked on hamburger (navbar::before)
      if (e.target.closest('.navbar') && e.clientX < 60) {
        sidebarOpen = !sidebarOpen;
        if (sidebarOpen) {
          sidebar.classList.add('show');
        } else {
          sidebar.classList.remove('show');
        }
      }
      
      // Close sidebar when clicking outside
      if (sidebarOpen && !e.target.closest('.sidebar') && !e.target.closest('.navbar')) {
        sidebar.classList.remove('show');
        sidebarOpen = false;
      }
      
      // Close sidebar when clicking on history items
      if (e.target.closest('.history li')) {
        sidebar.classList.remove('show');
        sidebarOpen = false;
      }
      
      // Close sidebar when clicking new chat button
      if (e.target.closest('button') && e.target.textContent.includes('New Chat')) {
        sidebar.classList.remove('show');
        sidebarOpen = false;
      }
    });
  });
  