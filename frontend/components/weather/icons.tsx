import { PiCloudRainThin, PiCloudRain, PiCloudRainBold, PiCloud, PiCloudBold, PiCloudFogThin, PiCloudFog, PiCloudFogDuotone } from "react-icons/pi"
import { CiCloudDrizzle, CiNoWaitingSign } from "react-icons/ci"
import { RiDrizzleLine } from "react-icons/ri"
import { LuCloudDrizzle } from "react-icons/lu"
import { BsCloudDrizzle, BsCloudDrizzleFill } from "react-icons/bs"
import { IoSunnyOutline, IoPartlySunnyOutline, IoRainySharp, IoThunderstormSharp } from "react-icons/io5"
import { IoIosRainy } from "react-icons/io"
import { PiCloudSnowLight, PiCloudSnow, PiCloudSnowDuotone } from "react-icons/pi"
import { GiSnowing, GiSnowflake2 } from "react-icons/gi"
import { WiShowers } from "react-icons/wi"
import { LiaCloudShowersHeavySolid } from "react-icons/lia"
import { FaCloudShowersHeavy } from "react-icons/fa"
import { PiSnowflakeThin, PiSnowflake, PiSnowflakeBold } from "react-icons/pi"


function get_wc_string(wc: number | undefined) {
    switch (wc) {
        case 0:
            return "Clear sky";
        case 1:
            return "Mainly clear";
        case 2:
            return "Partly cloudy";
        case 3:
            return "Overcast";
        case 45:
            return "Fog";
        case 48:
            return "Depositing rime fog";
        case 51:
            return "Drizzle: Light";
        case 53:
            return "Drizzle: moderate";
        case 55:
            return "Drizzle: dense intensity";
        case 56:
            return "Freezing Drizzle: Light";
        case 57:
            return "Freezing Drizzle: dense intensity";
        case 61:
            return "Rain: Slight";
        case 63:
            return "Rain: moderate";
        case 65:
            return "Rain: heavy intensity";
        case 66:
            return "Freezing Rain: Light";
        case 67:
            return "Freezing Rain: heavy intensity";
        case 71:
            return "Snow fall: Slight";
        case 73:
            return "Snow fall: moderate";
        case 75:
            return "Snow fall: heavy intensity";
        case 77:
            return "Snow grains";
        case 80:
            return "Rain showers: Slight";
        case 81:
            return "Rain showers: moderate";
        case 82:
            return "Rain showers: violent";
        case 85:
            return "Snow showers slight";
        case 86:
            return "Snow showers heavy";
        case 95:
            return "Thunderstorm: Slight or moderate";
        case 96:
            return "Thunderstorm with slight hail";
        case 99:
            return "Thunderstorm with heavy hail";
        case 101:
            return "";
        default:
            return "";

    }
}


function WIcon({ wc, x, y, z }: { wc: number | undefined; x?: string | undefined; y?: string | undefined; z?: number | undefined }) {

    function get_wc_icon() {
        switch (wc) {
            case 0:
                return <IoSunnyOutline />
            case 1:
                return <IoPartlySunnyOutline />
            case 2:
                return <PiCloud />
            case 3:
                return <PiCloudBold />
            case 45:
                return <PiCloudFogThin />
            case 48:
                return <PiCloudFogDuotone />
            case 51:
                return <CiCloudDrizzle />
            case 53:
                return <RiDrizzleLine />
            case 55:
                return <LuCloudDrizzle />
            case 56:
                return <BsCloudDrizzle />
            case 57:
                return <BsCloudDrizzleFill />
            case 61:
                return <PiCloudRainThin />
            case 63:
                return <PiCloudRain />
            case 65:
                return <PiCloudRainBold />
            case 66:
                return <IoIosRainy />
            case 67:
                return <IoRainySharp />
            case 71:
                return <PiSnowflakeThin />
            case 73:
                return <PiSnowflake />
            case 75:
                return <PiSnowflakeBold />
            case 77:
                return <GiSnowflake2 />
            case 80:
                return <WiShowers />
            case 81:
                return <LiaCloudShowersHeavySolid />
            case 82:
                return <FaCloudShowersHeavy />
            case 85:
                return <PiCloudSnowLight />
            case 86:
                return <PiCloudSnowDuotone />
            case 95:
                return <IoThunderstormSharp />
            case 96:
                return <IoThunderstormSharp />
            case 99:
                return <IoThunderstormSharp />
            case 101:
                return <CiNoWaitingSign />
            default:
                return <></>

        }
    }


    return (
        <div className={z === undefined ? "" : "absolute z-" + z + " opacity-90 text-lg font-bold text-indigo-600"} style={{ left: x + "px", top: y + "px" }}>
            {get_wc_icon()}
        </div>
    )
}

export default WIcon;
export { get_wc_string };