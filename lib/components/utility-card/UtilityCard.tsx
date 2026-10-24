import {Utility} from "@/lib/utility";
import {formatTimestamp} from "@/lib/helper-functions/format-timestamp";
import './UtilityCard.scss';
import Image from 'next/image';

type Props = {
    utility: Utility;
    openedAt?: string;
};

export function C_UtilityCard(p: Props) {
    const opened = p.openedAt ? formatTimestamp(p.openedAt) : undefined;

    return <li className={'utility-card'} data-utility={p.utility.id}>
        <a href={p.utility.path}>
            <Image src={p.utility.bannerSrc} alt={''} width={0} height={0} className={'banner'}/>
            <div className="body">
                <Image src={p.utility.iconSrc} alt={''} width={72} height={72} className={'icon'}/>
                <span className="name">{p.utility.name}</span>
                {opened
                    ? <span className="when">Last used {opened}</span>
                    : <span className="summary">{p.utility.summary}</span>
                }
            </div>
        </a>
    </li>
}
