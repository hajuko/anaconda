got.customLeaflet = {
    crs: L.Util.extend({}, L.CRS, {
        projection: L.Projection.LonLat,
        transformation: new L.Transformation(1, 0, 1, 0)
    })
};

L.Map = L.Map.extend({
    // Rounding removed
    latLngToLayerPoint: function(latLng) {
        var projectedPoint = this.project(L.latLng(latLng));

        return projectedPoint._subtract(this.getPixelOrigin());
    }
});
