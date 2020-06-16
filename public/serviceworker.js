const version = "0.6.18";
const cacheName = `MimcoProd-${version}`;
var filesToCache = [

    'mimco2.png'



];
var filesToCache = ['js/js_jose.js'];
/*
 var filesToCache = [
 'js/jquery.scrollUp.min.js',
 'js/meanmenu/jquery.meanmenu.js',
 'js/counterup/jquery.counterup.min.js',
 'js/counterup/waypoints.min.js',
 'js/counterup/counterup-active.js',
 'js/scrollbar/jquery.mCustomScrollbar.concat.min.js',
 'js/sparkline/jquery.sparkline.min.js',
 'js/sparkline/sparkline-active.js',
 'js/flot/jquery.flot.js',
 'js/flot/jquery.flot.resize.js',
 'js/flot/flot-active.js',
 'js/knob/jquery.knob.js',
 'js/knob/jquery.appear.js',
 'js/knob/knob-active.js',
 'js/chat/jquery.chat.js',
 'js/js_jose.js',
 'js/wave/waves.min.js',
 'js/wave/wave-active.js',
 'js/icheck/icheck.min.js',
 'js/icheck/icheck-active.js',
 'js/todo/jquery.todo.js',
 'js/login/login-action.js',
 'js/plugins.js',
 'js/main.js',
 'Folder/login.js',
 '/',
 'js/owl.carousel.min.js',
 'js/jquery-price-slider.js',
 'js/wow.min.js',
 'js/bootstrap.min.js',
 'js/vendor/jquery-1.12.4.min.js',
 'js/sweetalert2@8.js',
 'css/font_mimco_login.css',
 'css/bootstrap.min.css',
 'css/font-awesome.min.css',
 'css/owl.carousel.css',
 'css/owl.theme.css',
 'css/owl.transitions.css',
 'css/animate.css',
 'css/normalize.css',
 'css/scrollbar/jquery.mCustomScrollbar.min.css',
 'css/wave/waves.min.css',
 'css/notika-custom-icon.css',
 'css/main.css',
 'css/ionicons.min.css',
 'plugins/fontawesome-free/css/all.min.css',
 'iconos-svg/logout_r.svg',
 'plugins/summernote/summernote-bs4.css',
 'plugins/icheck-bootstrap/icheck-bootstrap.min.css',
 'plugins/overlayScrollbars/css/OverlayScrollbars.min.css',
 'style.css',
 'estilos_mimco.css',
 'css/responsive.css',
 'css/estilos_fuentes.css',
 'plugins/datatables-bs4/css/dataTables.bootstrap4.css',
 'plugins/daterangepicker/daterangepicker.css',
 'imagenes-mimco/logo.png',
 'manifest.json',
 'css/fuentes_mimco.css',
 'iconos-svg/syncronise_2_orig.gif',
 'mimco.PNG',
 'dist/js/adminlte.js',
 'plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js',
 'dist/img/user2-160x160.jpg',
 'jqwidgets/styles/jqx.base.css',
 'jqwidgets/jqwidgets/jqxdropdownlist.js',
 'jqwidgets/styles/jqx.darkblue.css',
 'jqwidgets/jqwidgets/jqxbuttons.js',
 'jqwidgets/jqwidgets/jqxmenu.js',
 'jqwidgets/jqwidgets/jqxdata.js',
 'jqwidgets/styles/jqx.bootstrap.css',
 'plugins/bootstrap/js/bootstrap.bundle.min.js',
 'plugins/moment/moment.min.js',
 'dist/js/demo.js',
 'dist/css/AdminLTE.min.css',
 'plugins/fontawesome-free/webfonts/fa-regular-400.woff2',
 'js/vendor/modernizr-2.8.3.min.js',
 'css/estilos_propios/style.css',
 'plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css',
 'mimco2.png',
 'fonts/notika-icon.ttf?qzfrsz',
 'images/icons/mimco2.png',
 'jqwidgets/jqwidgets/jqxscrollbar.js',
 'jqwidgets/jqwidgets/jqxlistbox.js',
 'jqwidgets/jqwidgets/jqxgrid.pager.js',
 'jqwidgets/jqwidgets/jqxcore.js',
 'jqwidgets/jqwidgets/jqxgrid.selection.js',
 'jqwidgets/jqwidgets/jqxinput.js',
 'jqwidgets/jqwidgets/jqxgrid.filter.js',
 'jqwidgets/jqwidgets/jqxwindow.js',
 'jqwidgets/jqwidgets/jqxgrid.js',
 'jqwidgets/jqwidgets/jqxgrid.sort.js',
 'jqwidgets/jqwidgets/jqxnumberinput.js',
 'jqwidgets/jqwidgets/jqxpanel.js',
 'jqwidgets/jqwidgets/jqxcombobox.js',
 'jqwidgets/jqwidgets/jqxcalendar.js',
 'jqwidgets/jqwidgets/jqxdata.export.js',
 'jqwidgets/jqwidgets/jqxgrid.export.js',
 'jqwidgets/jqwidgets/jqxgrid.columnsresize.js',
 'jqwidgets/jqwidgets/jqxcheckbox.js',
 'jqwidgets/jqwidgets/jqxgrid.edit.js',
 'jqwidgets/jqwidgets/globalization/globalize.js',
 'jqwidgets/jqwidgets/jqxgrid.grouping.js',
 'jqwidgets/scripts/demos.js',
 'jqwidgets/jqwidgets/jqxgrid.aggregates.js',
 'plugins/summernote/summernote-bs4.min.js',
 'jqwidgets/styles/images/icon-down-white.png',
 'jqwidgets/styles/images/icon-up-white.png',
 'jqwidgets/styles/images/icon-left-white.png',
 'jqwidgets/styles/images/icon-right-white.png',
 'jqwidgets/styles/images/loader.gif',
 'jqwidgets/styles/images/icon-sort-remove.png',
 'jqwidgets/styles/images/icon-sort-asc.png',
 'jqwidgets/styles/images/icon-sort-desc-white.png',
 'jqwidgets/styles/images/icon-sort-desc.png',
 'jqwidgets/styles/images/icon-sort-asc-white.png',
 'jqwidgets/styles/images/icon-sort-remove-white.png',
 'jqwidgets/jqwidgets/jqxdatetimeinput.js',
 
 ];
 */
// Cache on install
self.addEventListener("install", event => {
    this.skipWaiting();
    event.waitUntil(
            caches.open(cacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
            )
});
/*
 // Clear cache on activate
 self.addEventListener('activate', event => {
 event.waitUntil(
 caches.keys().then(cacheNames => {
 return Promise.all(
 cacheNames
 .filter(cacheName => (cacheName.startsWith("pwa-")))
 .filter(cacheName => (cacheName !== cacheName))
 .map(cacheName => caches.delete(cacheName))
 );
 })
 );
 });
 */
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});
// Serve from Cache
/*  
 self.addEventListener("fetch", event => {
 event.respondWith(
 
 caches.match(event.request)
 .then(response => {
 return response || fetch(event.request);
 })
 .catch(() => {
 return caches.match('offline');
 })
 )
 });
 */

self.addEventListener('fetch', event => {
    
    // ignore anything other than GET requests

});

 

self.addEventListener('push', function (event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    const sendNotification = body => {
        // you could refresh a notification badge here with postMessage API
        const title = "MimcoApps";

        return self.registration.showNotification(title, {
          body: body,
          icon: 'https://mimcoapps.mimco.com.pe/SistemaProduccion/images/icons/mimco-192x192.png',
          requireInteraction: false,
          vibrate: [200, 100, 200]
         //  actions: [ 
      //{ action: 'Button one', title: "Button one text" },
    //  { action: 'Button two', title: "Button two text" }
   // ]
        });
    };

    if (event.data) {
        const message = event.data.text();
        event.waitUntil(sendNotification(message));
    }
});
 