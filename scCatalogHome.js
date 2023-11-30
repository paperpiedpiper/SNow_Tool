"use strict";
const gsft_main = document?.querySelector('macroponent-f51912f4c700201072b211d4d8c26010')?.shadowRoot?.querySelector('iframe#gsft_main')?.contentWindow;

const allCatalogExpand = gsft_main?.document?.querySelector("#dropzone0")?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[3]?.childNodes[0] || document?.querySelector("#dropzone0")?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[3]?.childNodes[0]

allCatalogExpand?.click();