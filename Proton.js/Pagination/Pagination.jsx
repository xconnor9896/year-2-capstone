import React, { useEffect, useState } from "react";
import { Button } from "..";

const Pagination = (props) => {
	const {
		// Element
		className,

		// Values
		activePage,
		onPageChange,
		totalPages,
		boundaryRange,
		overrideButtonContent,

		// States
		arrows,
		jumpArrows,
		disabled,
		loading,

		// Styles
		emphasis,
		split,
		wrap,
		vertical,
		color,
		hollow,
		underline,
		compact,
	} = props;

	const [extraAttributes, setExtraAttributes] = useState({});

	useEffect(() => {
		let nProps = { ...props };

		delete nProps.className;
		delete nProps.activePage;
		delete nProps.onPageChange;
		delete nProps.totalPages;
		delete nProps.boundaryRange;
		delete nProps.arrows;
		delete nProps.emphasis;
		delete nProps.split;
		delete nProps.wrap;
		delete nProps.vertical;
		delete nProps.color;
		delete nProps.hollow;
		delete nProps.underline;
		delete nProps.compact;
		delete nProps.disabled;
		delete nProps.loading;
		delete nProps.jumpArrows;
		delete nProps.overrideButtonContent;

		setExtraAttributes(nProps);
	}, [props]);

	const applyProps = () => ({
		...extraAttributes,
	});

	useEffect(() => {
		if (activePage > totalPages) onPageChange(totalPages);
		if (activePage < 1) onPageChange(1);
	}, [activePage, totalPages]);

	const [pageButtons, setPageButtons] = useState([]);

	useEffect(() => {
		setPageButtons(generatePageButtons());
	}, [activePage, totalPages, boundaryRange]);

	const generatePageButtons = () => {
		let pageButtons = [activePage];

		let bounds = boundaryRange && boundaryRange >= 0 ? boundaryRange : 0;

		let leftBonus =
			activePage > totalPages - bounds
				? activePage - (totalPages - bounds)
				: 0;

		let rightBonus = activePage < 1 + bounds ? bounds + 1 - activePage : 0;

		for (
			let i = activePage - 1;
			i > activePage - (bounds + leftBonus) - 1;
			i--
		) {
			if (i > 0) {
				pageButtons.unshift(i);
			}
		}

		for (
			let i = activePage + 1;
			i < activePage + (bounds + rightBonus) + 1;
			i++
		) {
			if (i <= totalPages) {
				pageButtons.push(i);
			}
		}

		return pageButtons;
	};

	// Class name "proton" derived from Button.Group
	return (
		<Button.Group
			split={split && +split ? "1" : undefined}
			wrap={wrap && +wrap ? "1" : undefined}
			vertical={vertical && +vertical ? "1" : undefined}
			className={`pagination${className ? " " + className : ""}`}
			{...applyProps()}
		>
			{jumpArrows && (
				<Button
					disabled={disabled || !!loading || activePage === 1}
					emphasis={emphasis || "default"}
					color={color && color}
					hollow={hollow && +hollow ? "1" : undefined}
					underline={underline && +underline ? "1" : undefined}
					compact={compact && +compact ? "1" : undefined}
					icon
					onClick={() => onPageChange(1)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-chevron-double-left"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
						/>
						<path
							fillRule="evenodd"
							d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
						/>
					</svg>
				</Button>
			)}
			{arrows && (
				<Button
					disabled={disabled || !!loading || activePage <= 1}
					emphasis={emphasis || "default"}
					color={color && color}
					hollow={hollow && +hollow ? "1" : undefined}
					underline={underline && +underline ? "1" : undefined}
					compact={compact && +compact ? "1" : undefined}
					icon
					onClick={() => onPageChange(activePage - 1)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-chevron-left"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
						/>
					</svg>
				</Button>
			)}
			{pageButtons.map((key) => {
				return (
					<Button
						disabled={disabled || !!loading}
						color={color && color}
						hollow={hollow && +hollow ? "1" : undefined}
						underline={underline && +underline ? "1" : undefined}
						compact={compact && +compact ? "1" : undefined}
						selected={activePage === key && !loading && !disabled}
						emphasis={activePage === key && (emphasis || "default")}
						key={key}
						loading={
							loading && activePage === key && +loading
								? "1"
								: undefined
						}
						onClick={() => onPageChange(key)}
					>
						{overrideButtonContent
							? overrideButtonContent(key)
							: key.toLocaleString(undefined, {
									minimumFractionDigits: 0,
							  }) !== undefined
							? key.toLocaleString(undefined, {
									minimumFractionDigits: 0,
							  })
							: key}
					</Button>
				);
			})}
			{arrows && (
				<Button
					disabled={disabled || !!loading || activePage >= totalPages}
					emphasis={emphasis || "default"}
					color={color && color}
					hollow={hollow && +hollow ? "1" : undefined}
					underline={underline && +underline ? "1" : undefined}
					compact={compact && +compact ? "1" : undefined}
					icon
					onClick={() => onPageChange(activePage + 1)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-chevron-right"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
						/>
					</svg>
				</Button>
			)}
			{jumpArrows && (
				<Button
					disabled={
						disabled || !!loading || activePage === totalPages
					}
					emphasis={emphasis || "default"}
					color={color && color}
					hollow={hollow && +hollow ? "1" : undefined}
					underline={underline && +underline ? "1" : undefined}
					compact={compact && +compact ? "1" : undefined}
					icon
					onClick={() => onPageChange(totalPages)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-chevron-double-right"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
						/>
						<path
							fillRule="evenodd"
							d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
						/>
					</svg>
				</Button>
			)}
		</Button.Group>
	);
};

export default Pagination;
