package ch.clip.trips.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import ch.clip.trips.ex.TriptNotFoundException;
import ch.clip.trips.model.BusinessTrip;
import ch.clip.trips.repo.BusinessTripRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")

public class BusinessTripController {

	@Autowired
	private BusinessTripRepository tripRepository;

//	ProductController(ProductRepository productRepository) {
//		this.productRepository = productRepository;
//	}
 

	
	// Aggregate root
	@GetMapping("/trips")
	// @RequestMapping(value = "/trips", method = RequestMethod.GET, produces =
	// "application/json")
	List<BusinessTrip> all() {
		return tripRepository.findAll();
	} 

	@PostMapping("/trips")
	// @RequestMapping(value = "/trips", method = RequestMethod.POST, produces =
	// "application/json", consumes = "appication/json")
	BusinessTrip newProduct(@RequestBody BusinessTrip newTrip) {
		return tripRepository.save(newTrip);
	}

//params.get("s")
	@GetMapping("/trips/search")
	List<BusinessTrip> searchTrips(@RequestParam Map<String, String> params) {
		List<BusinessTrip> AllTrips = tripRepository.findAll();
		String cleanedQuery = params.get("query").trim()
				.replaceAll("^\"|\"$", "")  // remove leading/trailing "
				.replaceAll("^'|'$", "")    // remove leading/trailing '
				.toLowerCase();
		System.out.println("Search param: " + cleanedQuery);

		List<BusinessTrip> filteredTrips = AllTrips.stream()
				.filter(trip -> trip.getTitle() != null && trip.getTitle().toLowerCase().contains(cleanedQuery))
				.collect(Collectors.toList());
		return filteredTrips;
	}


	// single Item
	@GetMapping("/trips/{id}")
	BusinessTrip one(@PathVariable Long id) {
		return tripRepository.findById(id)
				.orElseThrow(() -> new TriptNotFoundException(id));
	}

	// with HATEOAS
//	@GetMapping("/products/{id}")
//	Resource<Product> one(@PathVariable Long id) {
//		Product product = productRepository.findById(id)
//				.orElseThrow(() -> new ProductNotFoundException(id));
//		return new Resource<>(product,
//				linkTo(methodOn(ProductController.class).one(id)).withSelfRel(),
//				linkTo(methodOn(ProductController.class).all()).withRel("products"));
//	}
	 
	
//	@PutMapping("/products/{id}")
//	BusinessTrip replaceProduct(@RequestBody BusinessTrip newProduct, @PathVariable Long id) {
//		return productRepository.findById(id).map(product -> {
//			product.setName(newProduct.getName());
//			product.setPrice(newProduct.getPrice());
//			product.setQuantity(newProduct.getQuantity());
//			return productRepository.save(product);
//
//		}).orElseGet(() -> {
//			newProduct.setId(id);
//			return productRepository.save(newProduct);
//		});
//	}

	@DeleteMapping("/products/{id}")
	void deleteProduct(@PathVariable Long id) {
		tripRepository.deleteById(id);
	}

}
