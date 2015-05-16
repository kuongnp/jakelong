'use strict';

/** load client folder*/

exports.get = {
  handler: {
    directory: {
      path: '../view/themes',
      listing: false,
      index: true
    }
  }
};