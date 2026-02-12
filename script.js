/* ===========================
   Quruxlow Restaurant — Script
   =========================== */

(function () {
    'use strict';

    // --- Nav Scroll ---
    const nav = document.getElementById('nav');

    function onScroll() {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // --- Mobile Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            var offset = nav.offsetHeight + 10;
            var top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    // --- Menu Tabs ---
    var tabs = document.querySelectorAll('.menu-tab');
    var panels = document.querySelectorAll('.menu-panel');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var cat = this.getAttribute('data-cat');
            tabs.forEach(function (t) { t.classList.remove('active'); });
            this.classList.add('active');
            panels.forEach(function (panel) {
                panel.classList.remove('active');
                if (panel.id === cat) panel.classList.add('active');
            });
        });
    });

    // --- Scroll Reveal ---
    var revealEls = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });

    // --- Active Nav Highlighting ---
    var sections = document.querySelectorAll('section[id]');
    var navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    function highlightNav() {
        var current = '';
        sections.forEach(function (section) {
            if (window.scrollY >= section.offsetTop - nav.offsetHeight - 80) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', highlightNav, { passive: true });

})();
