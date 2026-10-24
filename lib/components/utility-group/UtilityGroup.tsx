import {C_UtilityCard} from "@/lib/components/utility-card/UtilityCard";
import { UtilityGroup } from "@/lib/utility";
import './UtilityGroup.scss';

type Props = {
    utilityGroup: UtilityGroup;
};

export function C_UtilityGroup(p: Props) {
    const groupKey= p.utilityGroup.key;
    const title = p.utilityGroup.title;
    return <section
        id={`group-${groupKey}`}
        className="utility-group"
        aria-labelledby={`group-${groupKey}`}
    >
        <h2>{title}</h2>
        <ul>{p.utilityGroup.utilities.map(utility => <C_UtilityCard key={utility.id} utility={utility}/>)}</ul>
    </section>
}