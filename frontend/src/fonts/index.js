import localFont from "next/font/local";

const paperlogy = localFont({
    src: [
        {
            path: './Paperlogy/Paperlogy-1Thin.woff2',
            weight: '100',
            style: 'normal',
        },
        {
            path: './Paperlogy/Paperlogy-2ExtraLight.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: './Paperlogy/Paperlogy-3Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: './Paperlogy/Paperlogy-4Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: './Paperlogy/Paperlogy-5Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: './Paperlogy/Paperlogy-6SemiBold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: './Paperlogy/Paperlogy-7Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: './Paperlogy/Paperlogy-8ExtraBold.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: './Paperlogy/Paperlogy-9Black.woff2',
            weight: '900',
            style: 'normal',
        },
    ],
    preload: true,
    display: 'swap',
    variable: '--font-paperlogy'
});

const uhBeeZziba = localFont({
    src: './UhBeeZZIBA-Regular.woff2',
    preload: true,
    display: 'swap',
    variable: '--font-uhbee-zziba'
});

export { paperlogy, uhBeeZziba };