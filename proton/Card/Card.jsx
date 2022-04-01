import React, { useEffect, useState } from "react";

const Card = (props) => {
	const {
		children,
		className,
		focusable,
		disabled,
		emphasis,
		color,
		loading,
		dropshadow,
		square,
		rounder,
		noborder,
		hovereffect,
	} = props;

	const [extraAttributes, setExtraAttributes] = useState({});

	useEffect(() => {
		let nProps = { ...props };

		delete nProps.children;
		delete nProps.className;
		delete nProps.focusable;
		delete nProps.disabled;
		delete nProps.emphasis;
		delete nProps.color;
		delete nProps.loading;
		delete nProps.dropshadow;
		delete nProps.square;
		delete nProps.rounder;
		delete nProps.noborder;
		delete nProps.hovereffect;

		setExtraAttributes(nProps);
	}, [props]);

	const applyProps = () => ({
		...extraAttributes,
	});

	return (
		<div
			focusable={focusable && +focusable ? "1" : undefined}
			loading={loading && +loading ? "1" : undefined}
			dropshadow={dropshadow && +dropshadow ? "1" : undefined}
			square={square && +square ? "1" : undefined}
			rounder={rounder && +rounder ? "1" : undefined}
			noborder={noborder && +noborder ? "1" : undefined}
			hovereffect={hovereffect && +hovereffect ? "1" : undefined}
			tabIndex={focusable ? 0 : -1}
			disabled={disabled || !!loading}
			emphasis={emphasis || "default"}
			color={color && color}
			className={`proton card${className ? " " + className : ""}`}
			{...applyProps()}
		>
			<div className="proton children">{children}</div>
			{loading && (
				<div className="proton loading">
					<div className="proton dot"></div>
					<div className="proton dot"></div>
					<div className="proton dot"></div>
				</div>
			)}
		</div>
	);
};

const Header = (props) => {
	const { children, className } = props;

	const [extraAttributes, setExtraAttributes] = useState({});

	useEffect(() => {
		let nProps = { ...props };

		delete nProps.children;
		delete nProps.className;

		setExtraAttributes(nProps);
	}, [props]);

	const applyProps = () => ({
		...extraAttributes,
	});

	return (
		<header
			className={`proton card-header${className ? " " + className : ""}`}
			{...applyProps()}
		>
			{children}
		</header>
	);
};

Card.Header = Header;

const Content = (props) => {
	const { children, className, flex } = props;

	const [extraAttributes, setExtraAttributes] = useState({});

	useEffect(() => {
		let nProps = { ...props };

		delete nProps.children;
		delete nProps.className;
		delete nProps.flex;

		setExtraAttributes(nProps);
	}, [props]);

	const applyProps = () => ({
		...extraAttributes,
	});

	return (
		<div
			flex={flex && +flex ? "1" : undefined}
			className={`proton card-content${className ? " " + className : ""}`}
			{...applyProps()}
		>
			{children}
		</div>
	);
};

Card.Content = Content;

const Image = (props) => {
	const { children, className } = props;

	const [extraAttributes, setExtraAttributes] = useState({});

	useEffect(() => {
		let nProps = { ...props };

		delete nProps.children;
		delete nProps.className;

		setExtraAttributes(nProps);
	}, [props]);

	const applyProps = () => ({
		...extraAttributes,
	});

	return (
		<div
			className={`proton card-image${className ? " " + className : ""}`}
			{...applyProps()}
		>
			{children}
		</div>
	);
};

Card.Image = Image;

const Group = (props) => {
	const { children, className } = props;

	const [extraAttributes, setExtraAttributes] = useState({});

	useEffect(() => {
		let nProps = { ...props };

		delete nProps.children;
		delete nProps.className;

		setExtraAttributes(nProps);
	}, [props]);

	const applyProps = () => ({
		...extraAttributes,
	});

	return (
		<div
			className={`proton card-group${className ? " " + className : ""}`}
			{...applyProps()}
		>
			{children}
		</div>
	);
};

Card.Group = Group;

export default Card;
