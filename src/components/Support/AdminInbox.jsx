import React from "react";
import TicketList from "./TicketList";

function AdminInbox() {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Support</h1>
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-3">Past Tickets</h2>
                <TicketList />
            </div>
        </div>
    )

}

export default AdminInbox;