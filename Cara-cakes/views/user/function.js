// <% if (events.length < 0) { %>0
//     <% } else if (events.length == 1) { %>
//         Pending
//         <% break %>
//     <% } else { %>
//     <% let noEvents = 0 %>
//     <% events.forEach(e => { %>
//     <div style="display: none;">
//         <%= (noEvents += 1) %>
//     </div>
//     <% }) %>
//     <%= noEvents %>
//     <input type="hidden" name="noEvents" value="<%= noEvents %>">
//     <% } %>