import * as React from "react";

import Image, { StaticImageData } from "next/image";
import iconWallet from "../../public/Receipt.svg";
import iconCalendar from "../../public/Calendar.svg";
import iconStar from "../../public/Star 2.svg";
import iconDoc from "../../public/Document.svg";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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
    <Card className="flex gap-4 rounded-lg bg-backgroundColor" sx={{ maxWidth: 345}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://ipfs.io/ipfs/QmPQXYmUKLHW2hLPqrTJWjbsaUW5G6dgycHiSm1Vi7Jtu7"
          alt="green iguana"
        />
        <CardContent className="bg-[#1F202A] text-white">
          <div className="flex gap-2">
            <Image src={iconWallet} alt="iconWallet" height={15}/>
            <Typography className="text-sm">00x0k12...ka1232</Typography>
          </div>
          <Typography gutterBottom variant="h5" component="div">
            Challenge IA
          </Typography>
          <Typography className="text-white" variant="body2" color="text.secondary">
          The fundamental data types in c are int, float and char. Today, we're discussing int and float data types...
          </Typography>
          <div className="flex justify-between">
            <div className="flex justify-center items-center gap-2">
              <Image src={iconDoc} alt="iconDoc" height={15}/>
              <p>11</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Image src={iconStar} alt="iconStar" height={15}/>
              <p>IA</p>

            </div>
            <div className="flex justify-center items-center gap-2">
            <Image src={iconCalendar} alt="iconCalendar" height={15}/>
            <p>10 / 12 / 2024</p>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
