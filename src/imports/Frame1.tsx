import svgPaths from "./svg-6wrxza1860";
import imgHerbPolski1 from "figma:asset/4298004db232dc8583585d7938919ec95c510abe.png";

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-start leading-[normal] not-italic relative shrink-0 w-full max-w-[530px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#101317] text-[16px] sm:text-[18px] md:text-[20px] w-full">Czy ta strona jest autentyczna?</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[13px] sm:text-[14px] md:text-[15px] text-black w-full">Zeskanuj kod QR w aplikacji mObywatel, aby potwierdzić jej wiarygodność.</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[20px] sm:gap-[30px] items-center relative shrink-0">
      <div className="h-[40px] sm:h-[48px] md:h-[53px] relative shrink-0 w-[33px] sm:w-[40px] md:w-[44px]" data-name="herb-polski 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgHerbPolski1} />
      </div>
      <Frame1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#0452a8] content-stretch flex h-[44px] sm:h-[48px] md:h-[50px] items-center justify-center px-[30px] sm:px-[40px] md:px-[45px] py-[12px] sm:py-[14px] md:py-[15px] relative rounded-[23px] shrink-0 w-auto min-w-[140px] sm:min-w-[160px] md:min-w-[174px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] sm:text-[15px] md:text-[16px] text-nowrap text-white whitespace-pre">Zweryfikuj</p>
    </div>
  );
}

function CloseSmall() {
  return (
    <div className="relative shrink-0 size-[24px] sm:size-[27px] md:size-[29px]" data-name="close_small">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 29">
        <g id="close_small">
          <mask height="29" id="mask0_3_30" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="29" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="29" id="Bounding box" width="29" />
          </mask>
          <g mask="url(#mask0_3_30)">
            <path d={svgPaths.p2b5b6e00} fill="var(--fill-0, #787878)" id="close_small_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[10px] sm:gap-[13px] items-center relative shrink-0">
      <Frame3 />
      <CloseSmall />
    </div>
  );
}

function Frame5() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0 flex-col sm:flex-row gap-4 sm:gap-0">
      <Frame2 />
      <Frame4 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative w-full">
      <div className="w-full">
        <div className="content-stretch flex items-start justify-between px-[12px] sm:px-[16px] md:px-[20px] py-[16px] sm:py-[18px] md:py-[20px] relative w-full">
          <Frame5 />
        </div>
      </div>
    </div>
  );
}