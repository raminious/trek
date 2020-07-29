import uglify from 'uglify-js'

import { ObjectId } from '@types'

export function getClientTrackingCode(id: ObjectId): string {
  const code = `
window['_trek_script'] = 'http://localhost:8088/tracking/trek.js';
window['_trek_id'] = '${id}';
window['_trek_ns'] = 'Trek';
;(function (scope, document, ns) {
  var trek = (scope[ns] = function () {})

  trek.identify = function () {
    alert();
  }
})(window, document, window['_trek_ns']);
  `.trim()

  return uglify.minify(code).code
}
