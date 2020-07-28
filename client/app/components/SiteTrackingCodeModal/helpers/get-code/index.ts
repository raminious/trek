export function getTrackingCode(site: ISite | null) {
  if (!site) {
    return ''
  }

  return `<script>
  window['_trek_script'] = '${window.location.origin}/tracking/trek.js';
  window['_trek_id'] = '${site._id}';
  window['_trek_ns'] = 'Trek';
  (function(w, d, ns, sc, u){
    console.log({ w, d, ns, sc, u });
  })(window,document,window['_trek_ns'],'script','user');
</script>
  `
}
