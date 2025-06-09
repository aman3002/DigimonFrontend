"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "./react-datepicker.css";

function CalendarIcon() {
  return (
<svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 2.25V5.625" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18 2.25V5.625" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.9375 10.2263H23.0625" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.6113 17.7413L17.6288 21.7238C17.4713 21.8813 17.325 22.1738 17.2913 22.3876L17.0775 23.9063C16.9988 24.4576 17.3813 24.8401 17.9325 24.7613L19.4513 24.5476C19.6651 24.5138 19.9688 24.3676 20.115 24.2101L24.0976 20.2276C24.7838 19.5413 25.1101 18.7426 24.0976 17.7301C23.0963 16.7288 22.2975 17.0551 21.6113 17.7413Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.0376 18.3149C21.3751 19.5299 22.3201 20.4749 23.5351 20.8124" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.5 24.75H9C5.0625 24.75 3.375 22.5 3.375 19.125V9.5625C3.375 6.1875 5.0625 3.9375 9 3.9375H18C21.9375 3.9375 23.625 6.1875 23.625 9.5625V13.5" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.4949 15.4124H13.505" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.3311 15.4124H9.34121" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.3311 18.7874H9.34121" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  );
}

export default function SearchPanel({ visible }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <div class={visible ? "absolute left-0 top-0 w-screen h-screen z-10 md:flex md:flex-col gap-4 p-4 bg-[#373636] rounded-md m-1" : "hidden md:flex md:flex-col gap-4 p-4 bg-[#373636] rounded-md m-1"}>
      <div class="flex justify-between">
        <div class="bg-[#049EAC] rounded-md p-2 font-bold flex gap-2">
          <input type="checkbox" />
          <span>All</span>
        </div>
        <div class="bg-[#089805] rounded-md p-2 font-bold flex gap-2">
          <input type="checkbox" />
          <span>Viral</span>
        </div>
        <div class="bg-[#C10003] rounded-md p-2 font-bold flex gap-2">
          <input type="checkbox" />
          <span>Violent</span>
        </div>
      </div>
      <div class="flex gap-4">
          <div>
            <DatePicker showIcon selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Start" icon={CalendarIcon()} />
          </div>
          <div>
            <DatePicker showIcon selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="End" icon={CalendarIcon()} />
          </div>
      </div>
      <div>
      </div>
      <div class="flex gap-2 items-center">
        <input size="1" placeholder="Search in list" class="bg-[#151515] border rounded-md p-2 font-bold grow" />
        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7292 32.3749C25.8179 32.3749 32.375 25.8178 32.375 17.7291C32.375 9.64041 25.8179 3.08325 17.7292 3.08325C9.64054 3.08325 3.08337 9.64041 3.08337 17.7291C3.08337 25.8178 9.64054 32.3749 17.7292 32.3749Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M33.9167 33.9166L30.8334 30.8333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      </div>
      <div class="bg-[#151515] p-2 font-bold rounded-md h-full">
        <p>#Manali</p>
<p>#himachalpradesh</p>
<p>#viral</p>
<p>#food</p>
<p>#reels</p>
<p>#love</p>
<p>#instagood</p>
      </div>
    </div>
  );
}
/* vi: set et sw=2: */
