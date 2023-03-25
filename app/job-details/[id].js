import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'

import { COLORS, icons, SIZES } from '../../constants'
import { useFetch } from '../../hook/useFetch'

const tabs = ['About', 'Qualifications', 'Responsibilites']

const JobDetails = () => {
  const params = useSearchParams()
  const router = useRouter()
  console.log(params.id)

  const { data, isLoading, error } = useFetch('job-details', {
    job_id: params.id,
    extended_publisher_details: 'false'
  })

  const [refreshing, setRefreshing] = useState(false)
  const [activeTabs, setActiveTabs] = useState(tabs[0])

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true)
  //   refetch()
  //   setRefreshing(false)
  // }, [])

  const onRefresh = () => {
  }

  const displayTabContent = () => {
    switch (activeTabs) {
      case 'About':
        return <JobAbout info={data[0].job_description ?? 'No description'} />
      case 'Qualifications':
        return <Specifics title='Qualifications' points={data[0].job_highlights?.Qualifications ?? ['N/A']} />
      case 'Responsibilites':
        return <Specifics title='Responsibilites' points={data[0].job_highlights?.Responsibilities ?? ['N/A']} />
      default:
        break
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <ScreenHeaderBtn iconUrl={icons.left} dimension='60%' handlePress={() => router.back()} />,
          headerRight: () => <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' handlePress={() => console.log('Share')} />,
          headerTitle: ''
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {isLoading
            ? (
              <ActivityIndicator size='large' color={COLORS.primary} />
              )
            : error
              ? (
                <Text>Something went wrong</Text>
                )
              : data.length === 0
                ? (
                  <Text>No data available</Text>
                  )
                : (
                  <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                    <Company
                      companyLogo={data[0].employer_logo}
                      jobTitle={data[0].job_title}
                      companyName={data[0].employer_name}
                      location={data[0].job_country}
                    />

                    <JobTabs
                      tabs={tabs}
                      activeTab={activeTabs}
                      setActiveTab={setActiveTabs}
                    />
                    {displayTabContent()}
                  </View>
                  )}
        </ScrollView>
        <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
      </>
    </SafeAreaView>
  )
}

export default JobDetails
