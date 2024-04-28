
interface CDropdownProps {
    buttonClass: string,
    dropdownClass: string,
    title: string,
    items: any[],
    onChangeFunction: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}

export const CDropdown: React.FC<CDropdownProps> = ({
    buttonClass = "default-custom-button",
    dropdownClass = "default-custom-dropdown",
    title,
    items,
    onChangeFunction,
}: CDropdownProps): JSX.Element => {
    return (
        <select className={buttonClass} onChange={onChangeFunction} name={title} defaultValue={""}>
            <option value="">{title}</option>
            {items.map((item, index) => (
                <option key={index} value={item.id} className={dropdownClass}>{item.name}</option>
            ))}
        </select>
    )
}

