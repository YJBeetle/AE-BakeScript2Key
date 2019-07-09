function main() {
    if (thisComp && thisComp.selectedLayers.length > 0) {
        for (var i = 0; i < thisComp.selectedLayers.length; i++) {
            var selectedLayer = thisComp.selectedLayers[i];
            var copyedLayer = selectedLayer.duplicate();
            copyedLayer.name = selectedLayer.name + "-baked"
            mapProperty(selectedLayer, copyedLayer, 0);
            selectedLayer.enabled = false;
        };
    } else {
        alert("No selected layer");
    };
}

function mapProperty(property, propertyCopy, deepth) {
    if (property.numProperties && propertyCopy.numProperties && property.numProperties === propertyCopy.numProperties) {
        for (var i = 1, il = property.numProperties; i <= il; i++) {
            var childProperty = property.property(i);
            var childPropertyCopy = propertyCopy.property(i);
            if (childProperty.canVaryOverTime && childProperty.canSetExpression && childProperty.expression && childPropertyCopy.canVaryOverTime) {
                childPropertyCopy.expression = "";
                for (var f = selectedLayer.startTime * thisComp.frameRate, fl = selectedLayer.outPoint * thisComp.frameRate; f < fl; f++) {
                    var t = f / thisComp.frameRate;
                    childPropertyCopy.setValueAtTime(t, childProperty.valueAtTime(t, false))
                }
            }

            mapProperty(childProperty, childPropertyCopy, deepth + 1);
        };
    }
}

var thisComp = app.project.activeItem;
main();