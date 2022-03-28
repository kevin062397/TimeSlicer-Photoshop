/** 
 * Photoshop script for creating a timeslice from a stack of images.
 * 
 * Each slice is  equal in width. The order of the slices is the same as that of the layers. The top layer can appear either to the left or to the left. When creating the timeslice, all existing masks are deleted.
 * 
 * TimeSlicer.jsx
 * TimeSlicer
 * 
 * Created by Haoyuan Kevin Xia on 10/30/19.
 * Version 1.0
 */

"use strict";

app.bringToFront();

/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":4,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Time Slicer","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Direction","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-2":{"id":2,"type":"RadioButton","parentId":3,"style":{"enabled":true,"varName":"leftToRightRadioButton","text":"Left to Right","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-3":{"id":3,"type":"Group","parentId":1,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-4":{"id":4,"type":"RadioButton","parentId":3,"style":{"enabled":true,"varName":"rightToLeftRadioButton","text":"Right to Left","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-5":{"id":5,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-6":{"id":6,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"cancelButton","text":"Cancel","justify":"center","preferredSize":[80,0],"alignment":null,"helpTip":null}},"item-7":{"id":7,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"okButton","text":"OK","justify":"center","preferredSize":[80,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"StaticText","parentId":1,"style":{"enabled":true,"varName":"directionDescriptionLabel","creationProps":{"truncate":"none","multiline":true,"scrolling":false},"softWrap":false,"text":"The layer on top appears to the right.","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,1,3,2,4,8,5,6,7],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"itemReferenceList":"None"}}
*/

// DIALOG
// ======
var dialog = new Window("dialog");
dialog.text = "Time Slicer";
dialog.orientation = "column";
dialog.alignChildren = ["center", "top"];
dialog.spacing = 10;
dialog.margins = 16;

// PANEL1
// ======
var panel1 = dialog.add("panel", undefined, undefined, { name: "panel1" });
panel1.text = "Direction";
panel1.orientation = "column";
panel1.alignChildren = ["left", "top"];
panel1.spacing = 10;
panel1.margins = 10;

// GROUP1
// ======
var group1 = panel1.add("group", undefined, { name: "group1" });
group1.orientation = "column";
group1.alignChildren = ["left", "center"];
group1.spacing = 10;
group1.margins = 0;

var leftToRightRadioButton = group1.add("radiobutton", undefined, undefined, { name: "leftToRightRadioButton" });
leftToRightRadioButton.text = "Left to Right";

var rightToLeftRadioButton = group1.add("radiobutton", undefined, undefined, { name: "rightToLeftRadioButton" });
rightToLeftRadioButton.text = "Right to Left";
rightToLeftRadioButton.value = true;

// PANEL1
// ======
var directionDescriptionLabel = panel1.add("statictext", undefined, undefined, { name: "directionDescriptionLabel", multiline: true });
directionDescriptionLabel.text = "The layer on top appears to the right.";

// GROUP2
// ======
var group2 = dialog.add("group", undefined, { name: "group2" });
group2.orientation = "row";
group2.alignChildren = ["left", "center"];
group2.spacing = 10;
group2.margins = 0;

var cancelButton = group2.add("button", undefined, undefined, { name: "cancelButton" });
cancelButton.text = "Cancel";
cancelButton.preferredSize.width = 80;

var okButton = group2.add("button", undefined, undefined, { name: "okButton" });
okButton.text = "OK";
okButton.preferredSize.width = 80;

// Radio button handler
function updateDirectionDescription() {
	if (Boolean(leftToRightRadioButton.value) && !Boolean(rightToLeftRadioButton.value)) {
		directionDescriptionLabel.text = "The layer on top appears to the left.";
		okButton.enabled = true;
	} else if (!Boolean(leftToRightRadioButton.value) && Boolean(rightToLeftRadioButton.value)) {
		directionDescriptionLabel.text = "The layer on top appears to the right.";
		okButton.enabled = true;
	} else {
		directionDescriptionLabel.text = "Select a direction.";
		okButton.enabled = false;
	}
}
leftToRightRadioButton.onClick = updateDirectionDescription;
rightToLeftRadioButton.onClick = updateDirectionDescription;

// Cancel button handler
cancelButton.onClick = function () {
	dialog.close();
};

// OK button handler
okButton.onClick = function () {
	dialog.close();
	// Creates only one history state for the entire script
	app.activeDocument.suspendHistory("Time Slicer", "startSlicing()");
	// startSlicing();
};

if (app.documents.length == 0) {
	alert("There is no document.\nPlease open a document to start.")
} else if (app.activeDocument.layers.length < getMinLayerCount()) {
	var layerCount = app.activeDocument.layers.length;
	var alertMessage = "There ";
	if (layerCount < 2) {
		alertMessage += "is ";
	} else {
		alertMessage += "are ";
	}
	if (layerCount < 1) {
		alertMessage += "no ";
	} else {
		alertMessage += "only " + layerCount.toString() + " ";
	}
	if (layerCount < 2) {
		alertMessage += "layer ";
	} else {
		alertMessage += "layers ";
	}
	alertMessage += "in this stack.\nThe minimun number is " + getMinLayerCount().toString() + ".";
	alert(alertMessage);
} else {
	dialog.show();
}

function startSlicing() {
	var document = app.activeDocument;
	var layers = document.layers;
	// Resets all layers
	for (var i = 0; i < layers.length; i++) {
		document.activeLayer = layers[i];
		document.activeLayer.visible = true;
		document.activeLayer.isBackgroundLayer = false;
		// Deletes all existing masks
		deleteLayerMask();
		deleteVectorMask();
	}
	// Create new layer masks
	var width = document.width.as("px");
	var height = document.height.as("px");
	var layerCount = layers.length
	for (var i = 0; i < layerCount; i++) {
		document.activeLayer = layers[i];
		var startPosition;
		var endPosition;
		// Will have gaps if masks do not overlap
		if (Boolean(leftToRightRadioButton.value)) {
			// Left to right
			startPosition = 0;
			endPosition = width / layerCount * (i + 1);
		} else {
			// Right to left
			startPosition = width / layerCount * (layerCount - i - 1);
			endPosition = width;
		}
		document.selection.select([[startPosition, 0], [endPosition, 0], [endPosition, height], [startPosition, height]], SelectionType.REPLACE);
		addLayerMaskRevealSelection();
		document.selection.deselect();
	}
}

// Helper functions
function getMinLayerCount() {
	return 2;
}

// Photoshop actions
function deleteLayerMask() {
	// Throws exception if there is no layer mask
	try {
		var idDlt = charIDToTypeID("Dlt ");
		var desc = new ActionDescriptor();
		var idnull = charIDToTypeID("null");
		var ref = new ActionReference();
		var idChnl0 = charIDToTypeID("Chnl");
		var idChnl1 = charIDToTypeID("Chnl");
		var idMsk = charIDToTypeID("Msk ");
		ref.putEnumerated(idChnl0, idChnl1, idMsk);
		desc.putReference(idnull, ref);
		executeAction(idDlt, desc, DialogModes.NO);
	} catch (e) {
		return false;
	}
	return true;
}

function deleteVectorMask() {
	// Throws exception if there is no vector mask
	try {
		var idDlt = charIDToTypeID("Dlt ");
		var desc = new ActionDescriptor();
		var idnull = charIDToTypeID("null");
		var ref = new ActionReference();
		var idPath0 = charIDToTypeID("Path");
		var idPath1 = charIDToTypeID("Path");
		var idvectorMask = stringIDToTypeID("vectorMask");
		ref.putEnumerated(idPath0, idPath1, idvectorMask);
		var idLyr = charIDToTypeID("Lyr ");
		var idOrdn = charIDToTypeID("Ordn");
		var idTrgt = charIDToTypeID("Trgt");
		ref.putEnumerated(idLyr, idOrdn, idTrgt);
		desc.putReference(idnull, ref);
		executeAction(idDlt, desc, DialogModes.NO);
	} catch (e) {
		return false;
	}
	return true;
}

function addLayerMaskRevealSelection() {
	var idMk = charIDToTypeID("Mk  ");
	var desc = new ActionDescriptor();
	var idNw = charIDToTypeID("Nw  ");
	var idChnl0 = charIDToTypeID("Chnl");
	desc.putClass(idNw, idChnl0);
	var idAt = charIDToTypeID("At  ");
	var ref = new ActionReference();
	var idChnl1 = charIDToTypeID("Chnl");
	var idChnl2 = charIDToTypeID("Chnl");
	var idMsk = charIDToTypeID("Msk ");
	ref.putEnumerated(idChnl1, idChnl2, idMsk);
	desc.putReference(idAt, ref);
	var idUsng = charIDToTypeID("Usng");
	var idUsrM = charIDToTypeID("UsrM");
	var idRvlS = charIDToTypeID("RvlS");
	desc.putEnumerated(idUsng, idUsrM, idRvlS);
	executeAction(idMk, desc, DialogModes.NO);
}
