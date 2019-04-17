"use strict";

(function pdfjsScale() {
  'use strict';

  var Scale = PDFJS.Scale = function ScaleFunctionalityClosure() {
    function _createViewport(width, height, page) {
      var actualWidth = page.pageInfo.view[2];
      var actualHeight = page.pageInfo.view[3];
      var scale;
      var viewport;

      if (typeof width == 'number' && typeof height != 'number') {
        scale = width / actualWidth;
        viewport = page.getViewport(scale);
        return viewport;
      }

      if (typeof width != 'number' && typeof height == 'number') {
        scale = height / actualHeight;
        viewport = page.getViewport(scale);
        return viewport;
      }

      if (typeof width == 'number' && typeof height == 'number') {
        scale = height / actualHeight;

        if (scale * actualWidth > width) {
          scale = width / actualWidth;
          viewport = page.getViewport(scale);
          return viewport;
        }

        viewport = page.getViewport(scale);
        return viewport;
      }

      viewport = page.getViewport(1);
      return viewport;
    }

    return {
      render: function (width, height, page, target) {
        if (typeof width != 'number' && typeof height != 'number') {
          throw "at least one parameter must be specified as a number: width, height";
        }

        var viewport = _createViewport(width, height, page);

        var canvas = document.createElement('canvas');
        target.appendChild(canvas);
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        var context = canvas.getContext('2d');
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
      }
    };
  }();
}).call(typeof window === 'undefined' ? void 0 : window);