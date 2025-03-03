import {ImgHTMLAttributes} from "react";

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src="/assets/mobile-logo.png" alt="Logo" {...props} />;
}
