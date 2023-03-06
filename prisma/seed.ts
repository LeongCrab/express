import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.platforms.createMany({
    data: [
      {
        name: 'facebook',
        displayName: '페이스북',
        urlList: '-----',
        logoSrc: 'fb.|facebook|meta.',
      },
      {
        name: 'naver',
        displayName: '네이버',
        urlList: 'tv.naver'
      },
      {
        name: 'youtube',
        displayName: '유튜브',
        urlList: 'youtu.be|youtube',
      },
      {
        name: 'youtubeS',
        displayName: '유튜브 쇼츠',
        urlList: 'com/shorts/',
      },
      {
        name: 'tving',
        displayName: '티빙',
        urlList: 'tving',
      },
      {
        name: 'waave',
        displayName: '웨이브',
        urlList: 'waave',
      },
      {
        name: 'kakao',
        displayName: '카카오TV',
        urlList: '-----',
        logoSrc: 'tv.kakao',
      },
      {
        name: 'now',
        displayName: '네이버 NOW',
        urlList: 'now.naver',
      },
      {
        name: 'netflix',
        displayName: '넷플릭스',
        urlList: 'netflix.com',
      },
    ],
  });

  await prisma.users.create({
    data: {
      id: 1,
      nickname: 'test',
      email: 'test@riseenm.com',
      phone: '01087310337',
      password: '13',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });