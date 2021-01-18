import axios from 'axios';

function getData(to) {
	return new Promise((resolve) => {
		let serverData = JSON.parse(window.vuebnb_server_data);
		// If app encounters a change of the app route
		if (!serverData.path || to.path !== serverData.path) {
			// Load a data from the server using AJAX request
			axios.get(`/api${to.path}`).then(({ data }) => {
				resolve(data);
			});
		} else {
			resolve(serverData);
		}
	});
}

export default {
	beforeRouteEnter: (to, from, next) => {
		getData(to).then((data) => {
			next(component => component.assignData(data));
		});
	}
};
