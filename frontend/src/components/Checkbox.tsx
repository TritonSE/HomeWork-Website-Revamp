// import React from "react";

// import CheckboxCheckedIcon from "../../public/images/checkbox_checked.svg";
// import CheckboxIndeterminateIcon from "../../public/images/checkbox_indeterminant.svg";
// import { useInputControls } from "../components/hooks/useInputControls";

// import styles from "./Checkbox.module.css";
// import { RowInput } from "./RowInput";
// import { CommonInputProps } from "./common/CommonInputProps";

// export type CheckboxProps = {
//   /**
//    * ID for the checkbox input element. Must be unique in the document.
//    * Required in order to match the label with the input element.
//    */
//   id: string;

//   /**
//    * Whether the checkbox should be checked. If this prop is not provided, the
//    * component will maintain and update its internal checked state.
//    */
//   checked?: boolean;

//   /**
//    * Whether to display an indeterminate icon when the checkbox is checked
//    * (a minus sign instead of a checkmark).
//    */
//   indeterminate?: boolean;

//   /**
//    * Callback that fires when the checkbox's checked state is changed.
//    * @param newChecked whether the checkbox is checked after the change.
//    */
//   onChange?: (newChecked: boolean) => unknown;
// } & CommonInputProps;

// /**
//  * A checkbox input element, displays a single checkbox with a label. Can be
//  * either controlled (via the checked prop) or uncontrolled.
//  */
// export function Checkbox(props: CheckboxProps) {
//   const { id, label, checked, errorText, caption, disabled, name, indeterminate, onChange } = props;

//   const { internalValue: internalChecked, handleChange } = useInputControls({
//     value: checked,
//     defaultValue: false,
//     disabled,
//     onChange,
//   });

//   // Color for main checkbox and border
//   const checkboxColor = disabled ? "#d9d9d9" : errorText ? "#ff4d4f" : "#1a73e8";

//   return (
//     <RowInput
//       inputFirst
//       inputElement={
//         <div
//           className={styles.checkboxContainer}
//           style={{
//             border: `2px solid transparent`,
//           }}
//         >
//           <input
//             id={id}
//             name={name}
//             type="checkbox"
//             checked={internalChecked}
//             className={styles.checkbox}
//             style={{
//               border: `3px solid ${checkboxColor}`,
//             }}
//             onChange={(e) => {
//               handleChange(e.target.checked);
//             }}
//             disabled={disabled}
//           />
//           <label
//             htmlFor={id}
//             className={styles.checkmarkIcon}
//             style={internalChecked ? {} : { display: "none" }}
//           >
//             {indeterminate ? (
//               <CheckboxIndeterminateIcon width={24} height={24} style={{ fill: checkboxColor }} />
//             ) : (
//               <CheckboxCheckedIcon width={24} height={24} style={{ fill: checkboxColor }} />
//             )}
//           </label>
//         </div>
//       }
//       label={label}
//       errorText={errorText}
//       caption={caption}
//     />
//   );
// }

// // Replace code with constellation package
// // use tailwind instead of css
// // Text nandini and see if there should be something for secondary
// // Pull request edwin and get the global.css
