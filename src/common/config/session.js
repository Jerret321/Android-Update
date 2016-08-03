'use strict';

/**
 * session configs
 */
export default {
  name: 'hex_oss_update',
  type: 'file',
  secret: 'R3XTB(1L',
  timeout: 24 * 3600,
  cookie: { // cookie options
    length: 32,
    httponly: true
  },
  adapter: {
    file: {
      path: think.RUNTIME_PATH + '/session',
    }
  }
};