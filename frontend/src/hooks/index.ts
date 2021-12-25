import { useEffect, useState } from "react"

export function useGeolocation(options: PositionOptions = {}) : {
	geolocationPosition: GeolocationPosition | undefined, 
	error: GeolocationPositionError | undefined}{
	const [geolocationPosition, setGeolocationPosition] = useState<GeolocationPosition>()
	const [error, setError] = useState<GeolocationPositionError>()

	useEffect(() => {	
		if ((!geolocationPosition || geolocationPosition.timestamp < new Date().getTime() - (options.timeout ?? 5000)) && !error?.PERMISSION_DENIED) 
			navigator.geolocation.getCurrentPosition(setGeolocationPosition, setError, options)
	}, [options])
	
	return {geolocationPosition, error}
}