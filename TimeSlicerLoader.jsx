/** 
 * Photoshop script for loading images into a stack, which is used for creating a timeslice.
 * 
 * The input is a folder of images. Typically, the folder contains an image sequence shot at a fixed perspective and interval. The order of images in the stack is the order of their file names, where the first item is at the bottom of the stack. Subfolders, if there are any, are ignored. The supported image formats are JPEG, PNG, TIFF, and BMP. For a single load, all images should have the same format and dimension. The number of images in the stack is customizable. The minimum number is 2. The maximum number is the number of images in the selected folder.
 * 
 * TimeSlicerLoader.jsx
 * TimeSlicer
 * 
 * Created by Haoyuan Kevin Xia on 10/28/19.
 * Version 1.0
 */

"use strict";

app.bringToFront();

/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":19,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"","windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Time Slicer Loader","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Source Files","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-2":{"id":2,"type":"StaticText","parentId":8,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Input Folder:","justify":"left","preferredSize":[105,0],"alignment":null,"helpTip":null}},"item-4":{"id":4,"type":"Button","parentId":8,"style":{"enabled":true,"varName":"browseButton","text":"Browse...","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-5":{"id":5,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-6":{"id":6,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"cancelButton","text":"Cancel","justify":"center","preferredSize":[80,0],"alignment":null,"helpTip":null}},"item-7":{"id":7,"type":"Button","parentId":5,"style":{"enabled":false,"varName":"okButton","text":"OK","justify":"center","preferredSize":[80,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"Group","parentId":1,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-9":{"id":9,"type":"Group","parentId":1,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-10":{"id":10,"type":"StaticText","parentId":9,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"File Format:","justify":"left","preferredSize":[105,0],"alignment":null,"helpTip":null}},"item-11":{"id":11,"type":"DropDownList","parentId":9,"style":{"enabled":true,"varName":"fileFormatDropDown","text":"DropDownList","listItems":"JPEG, PNG, TIFF, BMP","preferredSize":[0,0],"alignment":null,"selection":0,"helpTip":null}},"item-12":{"id":12,"type":"Group","parentId":1,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-13":{"id":13,"type":"StaticText","parentId":12,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Number of Files:","justify":"left","preferredSize":[105,0],"alignment":null,"helpTip":null}},"item-14":{"id":14,"type":"EditText","parentId":12,"style":{"enabled":true,"varName":"fileCountTextBox","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"2","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-15":{"id":15,"type":"Group","parentId":1,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-16":{"id":16,"type":"StaticText","parentId":15,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"File Selection:","justify":"left","preferredSize":[105,0],"alignment":null,"helpTip":null}},"item-17":{"id":17,"type":"DropDownList","parentId":15,"style":{"enabled":true,"varName":"fileSelectionDropDown","text":"DropDownList","listItems":"Start, Middle, End, Equal Space","preferredSize":[0,0],"alignment":null,"selection":3,"helpTip":null}},"item-18":{"id":18,"type":"StaticText","parentId":15,"style":{"enabled":true,"varName":"fileSelectionModeLabel","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"","justify":"left","preferredSize":[150,0],"alignment":null,"helpTip":null}},"item-19":{"id":19,"type":"StaticText","parentId":8,"style":{"enabled":true,"varName":"inputPathLabel","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Click [ Browse... ] to select a folder.","justify":"left","preferredSize":[250,0],"alignment":null,"helpTip":null}},"item-20":{"id":20,"type":"StaticText","parentId":12,"style":{"enabled":true,"varName":"fileCountErrorLabel","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"","justify":"left","preferredSize":[250,0],"alignment":null,"helpTip":null}}},"order":[0,1,8,2,4,19,9,10,11,12,13,14,20,15,16,17,18,5,6,7],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"itemReferenceList":"None"}}
*/

// DIALOG
// ======
var dialog = new Window("dialog");
dialog.text = "Time Slicer Loader";
dialog.orientation = "column";
dialog.alignChildren = ["center", "top"];
dialog.spacing = 10;
dialog.margins = 16;

// PANEL1
// ======
var panel1 = dialog.add("panel", undefined, undefined, { name: "panel1" });
panel1.text = "Source Files";
panel1.orientation = "column";
panel1.alignChildren = ["left", "center"];
panel1.spacing = 10;
panel1.margins = 10;

// GROUP1
// ======
var group1 = panel1.add("group", undefined, { name: "group1" });
group1.orientation = "row";
group1.alignChildren = ["left", "center"];
group1.spacing = 10;
group1.margins = 0;

var statictext1 = group1.add("statictext", undefined, undefined, { name: "statictext1" });
statictext1.text = "Input Folder:";
statictext1.preferredSize.width = 105;

var browseButton = group1.add("button", undefined, undefined, { name: "browseButton" });
browseButton.text = "Browse...";

var inputPathLabel = group1.add("statictext", undefined, undefined, { name: "inputPathLabel" });
inputPathLabel.text = "Click [ Browse... ] to select a folder.";
inputPathLabel.preferredSize.width = 250;

// GROUP2
// ======
var group2 = panel1.add("group", undefined, { name: "group2" });
group2.orientation = "row";
group2.alignChildren = ["left", "center"];
group2.spacing = 10;
group2.margins = 0;

var statictext2 = group2.add("statictext", undefined, undefined, { name: "statictext2" });
statictext2.text = "File Format:";
statictext2.preferredSize.width = 105;

var fileFormatDropDown_array = ["JPEG", "PNG", "TIFF", "BMP"];
var fileFormatDropDown = group2.add("dropdownlist", undefined, undefined, { name: "fileFormatDropDown", items: fileFormatDropDown_array });
fileFormatDropDown.selection = 0;

// GROUP3
// ======
var group3 = panel1.add("group", undefined, { name: "group3" });
group3.orientation = "row";
group3.alignChildren = ["left", "center"];
group3.spacing = 10;
group3.margins = 0;

var statictext3 = group3.add("statictext", undefined, undefined, { name: "statictext3" });
statictext3.text = "Number of Files:";
statictext3.preferredSize.width = 105;

var fileCountTextBox = group3.add('edittext {properties: {name: "fileCountTextBox"}}');
fileCountTextBox.text = "2";
fileCountTextBox.preferredSize.width = 50;

var fileCountErrorLabel = group3.add("statictext", undefined, undefined, { name: "fileCountErrorLabel" });
fileCountErrorLabel.preferredSize.width = 250;

// GROUP4
// ======
var group4 = panel1.add("group", undefined, { name: "group4" });
group4.orientation = "row";
group4.alignChildren = ["left", "center"];
group4.spacing = 10;
group4.margins = 0;

var statictext4 = group4.add("statictext", undefined, undefined, { name: "statictext4" });
statictext4.text = "File Selection:";
statictext4.preferredSize.width = 105;

var fileSelectionDropDown_array = ["Start", "Middle", "End", "Equal Space"];
var fileSelectionDropDown = group4.add("dropdownlist", undefined, undefined, { name: "fileSelectionDropDown", items: fileSelectionDropDown_array });
fileSelectionDropDown.selection = 3;

var fileSelectionModeLabel = group4.add("statictext", undefined, undefined, { name: "fileSelectionModeLabel" });
fileSelectionModeLabel.preferredSize.width = 150;

// GROUP5
// ======
var group5 = dialog.add("group", undefined, { name: "group5" });
group5.orientation = "row";
group5.alignChildren = ["left", "center"];
group5.spacing = 10;
group5.margins = 0;

var cancelButton = group5.add("button", undefined, undefined, { name: "cancelButton" });
cancelButton.text = "Cancel";
cancelButton.preferredSize.width = 80;

var okButton = group5.add("button", undefined, undefined, { name: "okButton" });
okButton.enabled = false;
okButton.text = "OK";
okButton.preferredSize.width = 80;

// Browse button handler
var inputFolder;
browseButton.onClick = function () {
	var newInputFolder = Folder.selectDialog();
	// Only updates when the user selects a new folder
	// Uses the old value if the user selects Cancel
	if (newInputFolder != null) {
		inputFolder = newInputFolder;
	}
	okButton.enabled = inputFolder != null;
	inputPathLabel.text = inputFolder.fsName;
	// inputPathLabel.text = inputFolder.fullName;
};

// File format drop-down handler
var compatibleFileTypesList = [["jpg", "jpeg"], ["png"], ["tif", "tiff"], ["bmp"]];
var compatibleFileTypes = compatibleFileTypesList[Number(fileFormatDropDown.selection)];
fileFormatDropDown.onChange = function () {
	compatibleFileTypes = compatibleFileTypesList[Number(fileFormatDropDown.selection)];
}

// File count text box handler
fileCountTextBox.onChange = function () {
	if (fileCountTextBox.text == "") {
		fileCountErrorLabel.text = "";
	} else {
		var fileCount = Number(fileCountTextBox.text);
		if (isNaN(fileCount)) {
			fileCountErrorLabel.text = "The input is not a number.";
		} else if (fileCount < getMinFileCount()) {
			fileCountErrorLabel.text = "The minimum number is " + getMinFileCount().toString() + ".";
		} else {
			fileCountErrorLabel.text = "";
		}
	}
}

// File selection drop-down handler
var fileSelectionPatterns = ["●○○●○○●○○", "○●○○●○○●○", "○○●○○●○○●", "●○○○●○○○●"];
fileSelectionModeLabel.text = fileSelectionPatterns[Number(fileSelectionDropDown.selection)];
fileSelectionDropDown.onChange = function () {
	fileSelectionModeLabel.text = fileSelectionPatterns[Number(fileSelectionDropDown.selection)];
}

// Cancel button handler
cancelButton.onClick = function () {
	dialog.close();
};

// OK button handler
okButton.onClick = function () {
	var fileCount = Number(fileCountTextBox.text);
	// Handles empty or non-numerical input
	if (fileCountTextBox.text == "" || isNaN(fileCount)) {
		fileCountErrorLabel.text = "The input is not a number.";
	} else {
		// Handles decimal input
		fileCount = Math.round(fileCount);
		var minFileCount = getMinFileCount();
		var maxFileCount = getMaxFileCount();
		if (minFileCount > maxFileCount) {
			fileCountErrorLabel.text = "";
			var alertMessage = "There ";
			if (maxFileCount < 2) {
				alertMessage += "is ";
			} else {
				alertMessage += "are ";
			}
			if (maxFileCount < 1) {
				alertMessage += "no ";
			} else {
				alertMessage += "only " + maxFileCount.toString() + " ";
			}
			alertMessage += String(fileFormatDropDown.selection) + " ";
			if (maxFileCount < 2) {
				alertMessage += "file ";
			} else {
				alertMessage += "files ";
			}
			alertMessage += "in this folder.\nThe minimun number is " + minFileCount.toString() + ".";
			alert(alertMessage);
		} else if (fileCount < minFileCount) {
			fileCountErrorLabel.text = "The minimum number is " + minFileCount.toString() + ".";
		} else if (fileCount > maxFileCount) {
			fileCountErrorLabel.text = "The maximum number is " + maxFileCount.toString() + ".";
		} else {
			fileCountErrorLabel.text = "";
			dialog.close();
			loadFilesIntoStack(getSelectedFiles(fileCount));
		}
	}
};

// Displays the dialog window
dialog.show();

function loadFilesIntoStack(files) {
	open(files[0]);
	var masterDocument = app.activeDocument;
	var masterLayer = masterDocument.layers[0];
	masterLayer.isBackgroundLayer = false;
	masterLayer.name = getFileName(files[0]);

	var masterWidth = masterDocument.width.as("px");
	var masterHeight = masterDocument.height.as("px");

	for (var i = 1; i < files.length; i++) {
		open(files[i]);
		var currentDocument = app.activeDocument;

		var currentWidth = currentDocument.width.as("px");
		var currentHeight = currentDocument.height.as("px");
		if (currentWidth != masterWidth || currentHeight != masterHeight) {
			alert("Inconsistent Dimension\nFailed to load " + File.decode(files[i].name) + " because its dimension does not match that of " + File.decode(files[0].name) + ".");
			currentDocument.close(SaveOptions.DONOTSAVECHANGES);
			break;
		}

		var layer = currentDocument.layers[0];
		layer.isBackgroundLayer = false;
		layer.name = getFileName(files[i]);
		layer.duplicate(masterDocument.layers[0], ElementPlacement.PLACEBEFORE);
		currentDocument.close(SaveOptions.DONOTSAVECHANGES);
	}
}

// Helper functions
function getMinFileCount() {
	return 2;
}

function getMaxFileCount() {
	return getCompatibleFiles().length;
}

function getCompatibleFiles() {
	var result = [];
	var fileList = inputFolder.getFiles();
	for (var i = 0; i < fileList.length; i++) {
		var file = fileList[i];
		if (file instanceof File && !file.hidden && isFileCompatible(file)) {
			result.push(file);
		}
	}
	return result;
}

function getSelectedFiles(fileCount) {
	var sortedCompatibleFiles = getCompatibleFiles().sort(compareFiles);
	var totalFileCount = sortedCompatibleFiles.length;
	var indices = [];
	if (Number(fileSelectionDropDown.selection) == 3) {
		// Equal space
		var groupSize = (totalFileCount - 1) / (fileCount - 1);
		for (var i = 0; i < fileCount - 1; i++) {
			var index = Math.round(i * groupSize);
			indices.push(index);
		}
		indices.push(totalFileCount - 1);
	} else {
		// Start | Middle | End
		var groupSize = totalFileCount / fileCount;
		for (var i = 0; i < fileCount; i++) {
			var index;
			switch (Number(fileSelectionDropDown.selection)) {
				case 0:
					// Start
					index = Math.round(i * groupSize)
					break;
				case 1:
					// Middle
					index = Math.round((i + 0.5) * groupSize - 1);
					break;
				case 2:
					// End
					index = Math.round((i + 1) * groupSize - 1);
					break;
				default:
					index = -1;
					break;
			}
			indices.push(index);
		}
	}
	var result = [];
	for (var i = 0; i < indices.length; i++) {
		result.push(sortedCompatibleFiles[indices[i]]);
	}
	return result;
}

function isFileCompatible(file) {
	var extension = getFileExtension(file).toLowerCase();
	for (var i = 0; i < compatibleFileTypes.length; i++) {
		if (extension == compatibleFileTypes[i]) {
			return true;
		}
	}
	return false;
}

function getFileName(file) {
	var lastDot = file.name.lastIndexOf(".");
	if (lastDot == -1) {
		lastDot = file.name.length;
	}
	return File.decode(file.name.substr(0, lastDot));
}

function getFileExtension(file) {
	var lastDot = file.name.lastIndexOf(".");
	if (lastDot == -1) {
		return "";
	}
	return file.name.substr(lastDot + 1);
}

function compareFiles(file1, file2) {
	var file1Name = getFileName(file1);
	var file2Name = getFileName(file2);
	return file1Name == file2Name ? 0 : (file1Name > file2Name ? 1 : -1);
}
