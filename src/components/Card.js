function UserIcon() {
  return (
<svg class="inline" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 2.33325C10.9433 2.33325 8.45831 4.81825 8.45831 7.87492C8.45831 10.8733 10.8033 13.2999 13.86 13.4049C13.9533 13.3933 14.0466 13.3933 14.1166 13.4049C14.14 13.4049 14.1516 13.4049 14.175 13.4049C14.1866 13.4049 14.1866 13.4049 14.1983 13.4049C17.185 13.2999 19.53 10.8733 19.5416 7.87492C19.5416 4.81825 17.0566 2.33325 14 2.33325Z" fill="white"/>
<path d="M19.9267 16.5084C16.6717 14.3384 11.3633 14.3384 8.08502 16.5084C6.60335 17.5 5.78668 18.8417 5.78668 20.2767C5.78668 21.7117 6.60335 23.0417 8.07335 24.0217C9.70668 25.1184 11.8533 25.6667 14 25.6667C16.1467 25.6667 18.2933 25.1184 19.9267 24.0217C21.3967 23.03 22.2134 21.7 22.2134 20.2534C22.2017 18.8184 21.3967 17.4884 19.9267 16.5084Z" fill="white"/>
</svg>
  );
}

function HeartIcon() {
  return (
<svg class="inline" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.44 3.1001C14.63 3.1001 13.01 3.9801 12 5.3301C10.99 3.9801 9.37 3.1001 7.56 3.1001C4.49 3.1001 2 5.6001 2 8.6901C2 9.8801 2.19 10.9801 2.52 12.0001C4.1 17.0001 8.97 19.9901 11.38 20.8101C11.72 20.9301 12.28 20.9301 12.62 20.8101C15.03 19.9901 19.9 17.0001 21.48 12.0001C21.81 10.9801 22 9.8801 22 8.6901C22 5.6001 19.51 3.1001 16.44 3.1001Z" fill="#FF0044"/>
</svg>
  );
}

function ClockIcon() {
  return (
<svg class="inline" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51001" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  );
}

function ArrowIcon() {
  return (
<svg class="inline" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.6801 14.62L14.2401 12.06L11.6801 9.5" stroke="#59FF6C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 12.0601H14.17" stroke="#59FF6C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 4C16.42 4 20 7 20 12C20 17 16.42 20 12 20" stroke="#59FF6C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  );
}

function CommentsIcon() {
  return (
<svg class="inline" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 18V7C3.5 3 4.5 2 8.5 2H15.5C19.5 2 20.5 3 20.5 7V17C20.5 17.14 20.5 17.28 20.49 17.42" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.35 15H20.5V18.5C20.5 20.43 18.93 22 17 22H7C5.07 22 3.5 20.43 3.5 18.5V17.85C3.5 16.28 4.78 15 6.35 15Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 7H16" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 10.5H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );
}

function Comment({ username, comment }) {
  return (
    <>
      <p class="font-bold">{username} :</p>
      <p>{comment}</p>
    </>
  );
}

export default function Card() {
  return (
    <div class="bg-[#151515] flex flex-col md:flex-row p-4 gap-4">
      <div class="basis-0 grow p-2 md:p-0">
        <img src="/image 8.png" />
      </div>
      <div class="flex flex-col gap-4 basis-0 grow">
        <div class="grid grid-cols-[1fr_auto] md:grid-cols-4 justify-center items-center rounded-md border-[#818181] border p-2">
          <div class="flex md:justify-center items-center">
            <span><UserIcon /> Village.life</span>
          </div>
          <div class="flex justify-end md:justify-center items-center">
            <span><HeartIcon /> 21</span>
          </div>
          <div class="flex md:justify-center items-center">
            <span><ClockIcon /> 31/5/25, 6:30 pm</span>
          </div>
          <div class="flex justify-end md:justify-center items-center">
            <ArrowIcon />
          </div>
        </div>
        <div class="rounded-md border-[#818181] border p-2">
          <p>Witness the legendary origin of renowned Justice League member Wonder Woman as she fights for good with her sword and magic lasso. read more....</p>
        </div>
        <div class="rounded-t border-[#818181] border h-full flex flex-col p-2">
          <span class="self-center"><CommentsIcon /> Comments</span>
          <div class="grid grid-cols-[auto_1fr]">
            <Comment username="Shyam" comment="looks nice" />
            <Comment username="dhole.12" comment="she fights for good with her sword and magic lasso" />
          </div>
        </div>
      </div>
    </div>
  );
}
/* vi: set et sw=2: */
