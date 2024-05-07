export default function ChatLayout({ children, params }: { children: React.ReactNode; params: { id: symlinktring } }) {
	return (
		<div className="grid grid-cols-4">
			<ChatList></ChatList>
			{children}
		</div>
	);
}

function ChatList() {
	return <div>layout</div>;
}
