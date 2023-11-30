"use strict";
const gsft_main = document?.querySelector('macroponent-f51912f4c700201072b211d4d8c26010')?.shadowRoot?.querySelector('iframe#gsft_main')?.contentWindow;

const genericRequestSelection = gsft_main?.document?.querySelector("#detail_2f236d8e87f36550e642dce83cbb35f9 > td > table > tbody > tr > td > div") || document?.querySelector("#detail_2f236d8e87f36550e642dce83cbb35f9 > td > table > tbody > tr > td > div")

genericRequestSelection?.click();