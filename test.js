"use strict";

const assert = require("assert");
const clonefolder = require("clonefolder");
const deltree = require("./index.js");

const PATH = "temporary";

const tests = {
	"basic" () {
		clonefolder("node_modules", PATH);
		assert.equal(deltree(PATH), true);
	},
	"nonExistent" () {
		assert.equal(deltree("non/existent/path"), false);
	}
};

for (const name in tests) {
	try {
		tests[name]();
	} catch (e) {
		console.log(e);
	}
}
