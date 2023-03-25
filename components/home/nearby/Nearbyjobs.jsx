import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './nearbyjobs.style'
import { COLORS } from '../../../constants'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import { useFetch } from '../../../hook/useFetch'

const Nearbyjobs = () => {
  const router = useRouter()

  const { data, isLoading, error } = useFetch('search', {
    query: 'React developer',
    num_pages: 1
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity onPress={() => router.push('/jobs')}>
          <Text style={styles.headerBtn}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {isLoading
          ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
            )
          : error
            ? (
              <Text>{error.toString()}</Text>
              )
            : (
                data?.map((job) => (
                  <NearbyJobCard
                    key={`nearby-job-${job?.job_id}`}
                    job={job}
                    handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
                  />
                ))
              )}
      </View>
    </View>
  )
}

export default Nearbyjobs
