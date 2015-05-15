define([], function() {

  var ImageController = function(svg) {
    this.defs = svg.append('defs').attr('id', 'imgdefs');
  };

  ImageController.prototype = {

    addSvgImagePattern: function(id, imgUrl) {
      var pattern = this.defs.append('pattern')
        .attr('id', id)
        .attr('height', 1)
        .attr('width', 1)
        .attr('x', '0')
        .attr('y', '0');

      pattern.append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('height', 140)
        .attr('width', 140)
        .attr('xlink:href', imgUrl);
    }
  };

  return ImageController;
});
