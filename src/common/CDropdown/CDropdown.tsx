
interface CDropdownProps {
    buttonClass?: string,
    dropdownClass?: string,
    title: string,
    items: any[],
    selectedValue: string,
    onChangeFunction: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}

export const CDropdown: React.FC<CDropdownProps> = ({
    buttonClass = "default-custom-button",
    dropdownClass = "default-custom-dropdown",
    title,
    items,
    selectedValue,
    onChangeFunction,
}: CDropdownProps): JSX.Element => {
    // return (
    //     <select className={buttonClass} onChange={onChangeFunction} name={title} value={selectedValue}>
    //         {/* <option value="" disabled>{title}</option> */}
    //         {items.map((item) => (
    //             <option key={item._id} value={item._id} className={dropdownClass}>{item.name}</option>
    //         ))}
    //     </select>
    // )
    return (
        <select className={buttonClass} onChange={onChangeFunction} name={title} value={selectedValue}>
            {items.length === 0 ? (
                <option value={selectedValue} disabled>{title}</option>
            ) : (
                items.map((item) => (
                    <option key={item._id} value={item._id} className={dropdownClass}>{item.name}</option>
                ))
            )}
        </select>
    )
}

