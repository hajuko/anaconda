var factor = 256 * 8;

L.Map = L.Map.extend({
    // Rounding removed
    latLngToLayerPoint: function(latLng) {
        var projectedPoint = this.project(L.latLng(latLng));

        return projectedPoint._subtract(this.getPixelOrigin());
    }
    //
    //_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
    //
    //    var swOffset = this.project(maxBounds.getSouthWest(), zoom).subtract(pxBounds.min),
    //        neOffset = this.project(maxBounds.getNorthEast(), zoom).subtract(pxBounds.max),
    //
    //        dx = this._rebound(swOffset.x, - neOffset.x),
    //        dy = this._rebound(swOffset.y, - neOffset.y);
    //
    //    return new L.Point(dx, dy);
    //}
});

L.ImageOverlay = L.ImageOverlay.extend({
    _initImage: function () {
        console.log('fubar');
        var img = this._image =
            L.DomUtil.create('img', this.options.className + ' leaflet-image-layer ' + (this._zoomAnimated ? 'leaflet-zoom-animated' : ''));

        img.onselectstart = L.Util.falseFn;
        img.onmousemove = L.Util.falseFn;

        img.onload = L.bind(this.fire, this, 'load');

        if (this.options.crossOrigin) {
            img.crossOrigin = '';
        }

        img.src = this._url;
        img.alt = this.options.alt;
    }
});