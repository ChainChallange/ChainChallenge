import * as React from "react";

import Image, { StaticImageData } from "next/image";
import iconWallet from "../../public/Receipt.svg";
import iconCalendar from "../../public/Calendar.svg";
import iconStar from "../../public/Star 2.svg";
import iconDoc from "../../public/Document.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function CardChallenge({
  title,
  description,
  wallet,
  data,
  categories,
  attempt,
  image,
}: {
  title: string;
  description: string;
  wallet: string;
  attempt: number;
  data: string;
  categories: string;
  image: StaticImageData;
}) {
  return (
    <Card className="flex gap-4 rounded-lg bg-backgroundColor" sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://ipfs.io/ipfs/QmPQXYmUKLHW2hLPqrTJWjbsaUW5G6dgycHiSm1Vi7Jtu7"
          alt="green iguana"
        />
        <CardContent className="bg-[#1F202A] text-white gap-y-4 justify-center flex flex-col">
          <div className="flex gap-2">
            <Image src={iconWallet} alt="iconWallet" height={15} />
            <Typography className="text-sm text-[#D1D1D1]">00x0k12...ka1232</Typography>
          </div>
          <Typography gutterBottom variant="h5" component="div" className="m-0">
            {title}
          </Typography>
          <Typography
            className="text-sm text-[#D1D1D1] "
            variant="body2"
            color="text.secondary"
          >
            {description}
          </Typography>
          <div className="flex justify-between items-center">
            <div className="flex">
              <Image src={iconDoc} alt="icon" className="opacity-60" />
              <p className="ml-2 text-[#D1D1D1] text-sm">{attempt}</p>
            </div>
            <div className="flex">
              <Image src={iconStar} alt="icon" className="opacity-60"  />
              <p className="ml-2 text-[#D1D1D1] text-sm">{categories}</p>
            </div>
            <div className="flex">
              <Image src={iconCalendar} alt="icon" className="opacity-50" />
              <p className="ml-2 text-[#D1D1D1] text-sm">{data}</p>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
